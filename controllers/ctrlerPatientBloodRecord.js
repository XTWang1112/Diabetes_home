const req = require('express/lib/request');
const res = require('express/lib/response');

const mongoose = require('mongoose');
const patientModel = require('../models/patient');
const bloodGlucoseModel = mongoose.model('bloodGlucoses');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  try {
    var current_year = new Date().getFullYear();
    var current_month = new Date().getMonth() + 1;
    var current_day = new Date().getDate();
    var today = current_day + '-' + current_month + '-' + current_year;

    // const data = patientData;

    // console.log("submit的data" + patientData);
    // console.log("submit的data的病人id" + data.patient_id);
    // console.log("submit的data的病人名字" + data.patientName);

    // find id 对应的 patient
    let patient_id = '6267d6bb8b206aade8b24198';

    let search_day = '4-5-2022';

    let onePatient = await patientModel.findById(patient_id).lean();
    // 要找的这个人的所有血糖数据
    // let onePatientBloodRecord = await bloodGlucoseModel.find({patient_id}).lean();
    // console.log(onePatientBloodRecord);

    // 挑选出这个人的今天的血糖数据
    let onePatientBloodRecord = await bloodGlucoseModel
      .find({
        patient_id,
        time: {
          $gte: new Date(search_day).getTime(),
        },
        time: {
          $lte: new Date(search_day).getTime() + 24 * 3600 * 1000,
        },
      })
      .lean();
    let todayBloodRecord = await bloodGlucoseModel
      .find({
        patient_id,
        time: {
          $gte: Date.parse(search_day),
          $lte: Date.parse(search_day) + 24 * 3600 * 1000,
        },
      })
      .lean();

    // 输出是空的[] 无法确定是否有数据在里面
    // console.log(todayBloodRecord);

    if (onePatient) {
      // 渲染血糖上传页面
      res.render('Blood_glucose', {
        onePatient: onePatient,
        layout: 'patient_record_template',
      });

      // request the patient comment and bloodGlucose value from the input
      var glucose_comment = req.query.glucose_comment || 'no comments';
      var patinet_blood_glucose = req.query.patinet_blood_glucose;

      if (glucose_comment && patinet_blood_glucose) {
        let patientBloodRecord = {
          patient_id,
          value: patinet_blood_glucose,
          comment: glucose_comment,
          time: today,
        };

        // create the patient bloodRecord
        // await bloodGlucoseModel.create({
        //   ...patientBloodRecord
        // });

        // 如果今天的血糖值为空，则插入一条新的血糖值
        // find patient的
        if (!onePatientBloodRecord.today_blood_glucose_level) {
          // create the patient bloodRecord
          await bloodGlucoseModel.create({
            ...patientBloodRecord,
          });
        }
        // 如果今天有血糖值，则更新血糖值
        else {
          await bloodGlucoseModel.updateOne({});
        }
      }
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderPatientBloodRecord,
};

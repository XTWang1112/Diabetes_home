const req = require('express/lib/request');
const res = require('express/lib/response');

const mongoose = require('mongoose');
const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const bloodGlucoseModel = mongoose.model('bloodGlucoses');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  var current_year = new Date().getFullYear();
  var current_month = new Date().getMonth() + 1;
  var current_day = new Date().getDate();
  //   var today = current_day + '-' + current_month + '-' + current_year;
  var tomorrow = current_day + 1 + '-' + current_month + '-' + current_year;

  // find id 对应的 patient
  let find_id = '6267d6bb8b206aade8b24198';
  //   let patient_id = 1;
  const search_day = '2022-05-15T00:00:00.000Z';
  let today = new Date('2022-05-15').getTime();

  let onePatientRecord = await patientModel.findById(find_id).lean();

  const onePatientBloodRecord = await recordModel
    .find(
      {
        find_id,
        time: {
          $gte: new Date(search_day).getTime(),
          $lt: new Date(search_day).getTime() + 24 * 3600 * 1000,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        return result;
      }
    )
    .clone();

  console.log('aaaaaa' + onePatientBloodRecord);

  if (onePatientRecord) {
    // 渲染血糖上传页面
    res.render('Blood_glucose', {
      onePatient: onePatientRecord,
      layout: 'patient_record_template',
    });
    var glucose_comment = req.query.glucose_comment || 'no comments';
    var patinet_blood_glucose = req.query.patinet_blood_glucose;

    if (glucose_comment && patinet_blood_glucose) {
      let patientBloodRecord = {
        find_id,
        blood_glucose_level: patinet_blood_glucose,
        blood_glucose_level_comment: glucose_comment,
        time: today,
        complete: false,
      };
      if (onePatientBloodRecord.length === 0) {
        console.log('还在create:');
        await recordModel.create({
          ...patientBloodRecord,
        });
      } else if (
        onePatientBloodRecord.length !== 0 &&
        onePatientRecord.bloodGlucose_record
      ) {
        await recordModel.updateOne({
          find_id,
          time: today,
          blood_glucose_level: patinet_blood_glucose,
          blood_glucose_level_comment: glucose_comment,
        });
      }
    }
  }
};

module.exports = {
  renderPatientBloodRecord,
};

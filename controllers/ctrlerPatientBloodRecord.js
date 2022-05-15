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

  // 找出这个人的个人数据
  //   try{
  let onePatientRecord = await patientModel.findById(find_id).lean();
  //   }catch{
  //     console.log("没找到这个人");
  //   }

  let onePatientBloodRecord = await recordModel
    .find({
      find_id,
      time: {
        $gte: new Date(search_day).getTime(),
        $lt: new Date(search_day).getTime() + 24 * 3600 * 1000,
      },
    })
    .lean();
  res.status(200).json({
    status: 'success',
    data: {
      onePatientBloodRecord,
    },
  });

  //   //   // 定义变量时间戳。保存今天的ISODate
  //   //   let today_time = new Date().toISOString();
  //   //   console.log(today_time);
  //   //   console.log('今天' + today);
  //   //   console.log('明天' + tomorrow);

  //   // var gtTime = '2022-05-15T00:00:00.000Z';
  //   // var ltTime = '2022-05-15T23:59:59.999Z';

  //   // console.log(new Date(onePatientBloodRecord.time));

  //   // let todayBloodRecord = await bloodGlucoseModel.find({
  //   //     patient_id,
  //   //     time: {
  //   //         $gte: Date.parse(search_day),
  //   //         $lte: Date.parse(search_day) + 24 * 3600 * 1000
  //   //     }
  //   // }).lean();

  //   // 检查数据是否存在，如果不存在返回false
  //   function checkRecordComplete(checkRecordComplete) {
  //     if (checkRecordComplete == 'undefined') {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }

  //   if (onePatientRecord) {
  //     // 渲染血糖上传页面
  //     res.render('Blood_glucose', {
  //       onePatient: onePatientRecord,
  //       layout: 'patient_record_template',
  //     });

  //     // request the patient and bloodGlucose value from the input

  //     // query 用get post用 req.body.glucose_comment
  //     var glucose_comment = req.query.glucose_comment || 'no comments';
  //     var patinet_blood_glucose = req.query.patinet_blood_glucose;

  //     if (glucose_comment && patinet_blood_glucose) {
  //       let patientBloodRecord = {
  //         find_id,
  //         blood_glucose_level: patinet_blood_glucose,
  //         blood_glucose_level_comment: glucose_comment,
  //         time: today,
  //         complete: false,
  //       };

  //       // 如果今天没有录入数据，则插入一条新的血糖值
  //       console.log('测试判定' + onePatientBloodRecord);

  //       // onePatientBloodRecord存在的时候为True，不存在的时候不为false
  //       if (!onePatientBloodRecord.blood_glucose_level) {
  //         console.log('还在create: ' + onePatientBloodRecord.blood_glucose_level);
  //         await recordModel.create({
  //           ...patientBloodRecord,
  //         });
  //       }
  //       // 如果今天的血糖值为空(!blood_glu_level 要为true)，同时他被要求录入血糖值的数据(bloodGlu_record要为true)，则更新今天的血糖值
  //       else if (
  //         !onePatientBloodRecord.blood_glucose_level &&
  //         onePatientRecord.bloodGlucose_record
  //       ) {
  //         await recordModel.updateOne({
  //           find_id,
  //           time: today,
  //           blood_glucose_level: patinet_blood_glucose,
  //           blood_glucose_level_comment: glucose_comment,
  //         });

  //         // 如果四个数据都存在，则将complete修改为true
  //         if (
  //           checkRecordComplete(onePatientBloodRecord.blood_glucose_level) &&
  //           checkRecordComplete(onePatientBloodRecord.weight) &&
  //           checkRecordComplete(onePatientBloodRecord.exercise) &&
  //           checkRecordComplete(onePatientBloodRecord.insulinTaken)
  //         ) {
  //           console.log('complete修改为true');

  //           await recordModel.updateOne({
  //             complete: true,
  //           });
  //           // 得到complete为true的标记之后，给patient的insist day + 1
  //           await patientModel.updateOne({
  //             // insistDay +1
  //             insistDay: onePatientRecord.insistDay + 1,
  //           });
  //         }
  //       } else if (
  //         onePatientBloodRecord.blood_glucose_level &&
  //         onePatientRecord.bloodGlucose_record
  //       ) {
  //         // 如果今天的血糖值不为空，则更新今天的血糖值
  //         console.log('今天已经录入过血糖值');
  //         await recordModel.updateOne({
  //           blood_glucose_level: patinet_blood_glucose,
  //           blood_glucose_level_comment: glucose_comment,
  //         });
  //       }
  //     }
  //   } else {
  //     res.sendStatus(404);
  //   }
};

module.exports = {
  renderPatientBloodRecord,
};

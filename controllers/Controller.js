const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const patientModel = require('../models/patient');
const recordModel = mongoose.model('records');

const bloodGlucoseModel = mongoose.model('bloodGlucoses');
const weightModel = mongoose.model('weights');
const insulineTakenModel = mongoose.model('insulinTakens');
const exerciseModel = mongoose.model('exercises');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    // find patientModel里面全部病人的数据
    const patients = await patientModel.find({},
        {
          patientName: true,
          patientID: true,

          gender: true,
          photo_url: true,
          insistDay: true,
          birthday: true,

          bloodGlucose_lowerBound: true,
          bloodGlucose_upperBound: true,
        }
      ).lean();

    // Get Current date
    // const today = new Date(new Date().toDateString()).getTime();
    // const tomorrow = today + 24 * 3600 * 1000;

    // 获取当前日-月-年
    const date = new Date();
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth() + 1;
    const thisDay = date.getDate();
    const today_date = thisDay + '-' + thisMonth + '-' + thisYear;

    
    // Get each patient's latest blood glucose and weight  value
    for (patient of patients) {

      console.log(patient.patientName);

      // Select the curent day's data
      // 如果要用js操作mongoDB参数，把要操作的对象加到query里面，否则不会进行loop循环patient
      // 把time注释掉就能显示patient的记录
      let query = {
        patient_id: patient._id,
        // time: { $eq: today_date },
      };

      // sort blood glucose value according to date and time
      let bloodGlucose_result = await bloodGlucoseModel.findOne(query).sort({
        _id: -1,
      });

      // patient_result在循环的时候，是不会跟着loop的patient切换到下一位
      // let patient_result = await patientModel.findOne(query);

      // 输出用patient.birthday
      // manipulate input birthday and calculate age
      birth = Date.parse(patient.birthday.replace('/-/g', "/"));

      if (birth) {
        var year = 1000 * 60 * 60 * 24 * 365;
        var currTime = new Date();
        var birthday = new Date(birth);
        patient.birthday = parseInt((currTime - birthday) / year);
      }


      // 判断血糖是否超标

      // if (bloodGlucose_result) {
      //   // get the latest bloodGlucose value
      //   patient.today_blood_glucose_level = bloodGlucose_result.value;
      //   patient.timestamp_blood_glucose_level = bloodGlucose_result.time;
      //   patient.blood_glucose_level_lower_bound = patient_result.bloodGlucose_lowerBound;
      //   patient.blood_glucose_level_upper_bound = patient_result.bloodGlucose_upperBound;
      // } else {
      //   patient.today_blood_glucose_level = 0;
      //   patient.today_blood_glucose_level = 'No data today';
      // }

      // sort weight value according to date and time
      // let weight_result = await weightModel.findOne(query).sort({
      //   _id: -1,
      // });
      // if (weight_result) {
      //   console.log(weight_result);
      //   patient.today_weight = weight_result.value;
      //   patient.timestamp_weight = weight_result.time;
      //   patient.weight_lower_bound = 40;
      //   patient.weight_upper_bound = 85;
      // } else {
      //   patient.today_weight = 0;
      //   patient.today_weight = 'No data today';
      // }
      
    }

    res.render('Clinician_dashboard', {
      patients: patients
    });
  } catch (err) {
    console.log(err);
  }
};






// The function to get the current value of each data and render the patient dashboard
const renderPatientDashboard = async (req, res) => {
  let patient_id = '6267d6bb8b206aade8b24198';
  // find the patient using its id
  let patient = await patientModel.findById(patient_id).lean();
  // console.log(patient.patientName);

  const today = new Date(new Date().toDateString()).getTime();
  const tomorrow = today + 24 * 3600 * 1000;
  // Select the curent day's data
  let query = {
    patient_id: patient._id,
    time: { $gte: today },
    time: { $lte: tomorrow },
  };
  console.log(query);
  // 倒着sort id，找到最新的数据
  let bloodGlucose_result = await bloodGlucoseModel.findOne(query).sort({
    _id: -1,
  });

  // 定义了query的需求，赋值给patient_result
  let patient_result = await patientModel.findOne(query);

  // Declare a comments array
  comments = [];
  if (bloodGlucose_result) {
    console.log(bloodGlucose_result);
    patient.today_blood_glucose_level = bloodGlucose_result.value;
    patient.timestamp_blood_glucose_level = bloodGlucose_result.time;
    patient.blood_glucose_level_lower_bound = patient_result.bloodGlucose_lowerBound;
    patient.blood_glucose_level_upper_bound = patient_result.bloodGlucose_upperBound;
    // comments.push(bloodGlucose_result.comment)
  } else {
    patient.today_blood_glucose_level = 0;
    patient.today_blood_glucose_level = 'no data today';
  }
  
  console.log(comments);
  res.render('Patient_Dashboard', {
    patient,
    comments,
    layout: 'patient_template',
  });
};

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
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

  let search_day = "4-5-2022"; 

  let onePatient = await patientModel.findById(patient_id).lean();
  // 要找的这个人的所有血糖数据
  // let onePatientBloodRecord = await bloodGlucoseModel.find({patient_id}).lean();
  // console.log(onePatientBloodRecord);

  // 挑选出这个人的今天的血糖数据
  let onePatientBloodRecord = await bloodGlucoseModel.find({
    patient_id,
    time: { $gte: new Date(search_day).getTime() },
    time: { $lte: new Date(search_day).getTime() + 24 * 3600 * 1000 },
  }).lean();
  let todayBloodRecord = await bloodGlucoseModel.find({patient_id, 
    time: {
      $gte: Date.parse(search_day), 
      $lte: Date.parse(search_day) + 24 * 3600 * 1000
    }}).lean();


  console.log(todayBloodRecord);


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

      console.log(patientBloodRecord);
      // create the patient bloodRecord
      // await bloodGlucoseModel.create({
      //   ...patientBloodRecord
      // });

      // 如果今天的血糖值为空，则插入一条新的血糖值
      // find patient的
      if(!onePatientBloodRecord.today_blood_glucose_level){
        
        // create the patient bloodRecord
        await bloodGlucoseModel.create({
          ...patientBloodRecord
        });
      }
      // 如果今天有血糖值，则更新血糖值
      else{
        await bloodGlucoseModel.updateOne({

        }
      )}
    }
    } else {
    res.sendStatus(404);
  }
};



module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientBloodRecord,
};

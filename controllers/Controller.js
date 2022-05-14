const req = require('express/lib/request');
const { render } = require('express/lib/response');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    // find patientModel里面全部病人的数据
    const patients = await patientModel
      .find(
        {},
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
      )
      .lean();

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
      let bloodGlucose_result = await recordModel.findOne(query).sort({
        _id: -1,
      });

      // patient_result在循环的时候，是不会跟着loop的patient切换到下一位
      // let patient_result = await patientModel.findOne(query);

      // 输出用patient.birthday
      // manipulate input birthday and calculate age
      /* birth = Date.parse(patient.birthday.replace('/-/g', "/"));

      if (birth) {
        var year = 1000 * 60 * 60 * 24 * 365;
        var currTime = new Date();
        var birthday = new Date(birth);
        patient.birthday = parseInt((currTime - birthday) / year);
      } */

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
      patients: patients,
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
  let bloodGlucose_result = await recordModel.findOne(query).sort({
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
    patient.blood_glucose_level_lower_bound =
      patient_result.bloodGlucose_lowerBound;
    patient.blood_glucose_level_upper_bound =
      patient_result.bloodGlucose_upperBound;
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

const renderPatientWeight = (req, res) => {
  res.render('Weight_record', { layout: 'patient_record_template' });
};

const renderPatientInsulin = (req, res) => {
  res.render('Insulin_record', { layout: 'patient_record_template' });
};

const renderPatientExercise = (req, res) => {
  res.render('Exercise_record', { layout: 'patient_record_template' });
};

const renderPatientLogin = (req, res) => {
  res.render('Patient_login', {
    layout: 'no_layouts',
  });
};

const renderPatientRanking = (req, res) => {
  res.render('patient_ranking', {
    layout: 'patient_template',
  });
};
const postPatientLogin = (req, res) => {
  console.log(req.body);
  console.log(req.body.input_email);
};

const renderPatientMe = (req, res) => {
  res.render('patient_me', {
    layout: 'patient_template',
  });
};

const renderPatientClinician = (req, res) => {
  let support_message = await patientModel.find(patient_id).lean();
  res.render('patient_clinician', {
    support_message: support_message ,
    layout: 'patient_template',
  });
};


const renderPatientData = (req, res) => {
  res.render('patient_data', {
    layout: 'patient_template',
  });
};

const renderAboutWebsite = (req, res) => {
  res.render('About_website', { layout: 'info_template' });
};

const renderAboutDiabetes = (req, res) => {
  res.render('About_diabetes', { layout: 'info_template' });
};

module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientWeight,
  renderPatientInsulin,
  renderPatientExercise,
  renderPatientLogin,
  postPatientLogin,
  renderPatientRanking,
  renderPatientMe,
  renderPatientClinician,
  renderPatientData,
  renderAboutWebsite,
  renderAboutDiabetes,
};

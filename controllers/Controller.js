const req = require('express/lib/request');
const { render } = require('express/lib/response');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const patientData = require('../models/patient');
const patientModel = mongoose.model('patients');
const bloodGlucoseModel = mongoose.model('bloodGlucoses');
const weightModel = mongoose.model('weights');
const insulineTakenModel = mongoose.model('insulinTakens');
const exerciseModel = mongoose.model('exercises');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    const patients = await patientModel
      .find(
        {},
        {
          patientName: true,
          patientID: true,
          age: true,
          gender: true,
          photo_url: true,
          insistDay: true,

          bloodGlucose_lowerBound: true,
          bloodGlucose_upperBound: true,
        }
      )
      .lean();

    // Get Current date
    const today = new Date(new Date().toDateString()).getTime();
    const tomorrow = today + 24 * 3600 * 1000;

    // Get each patient's latest blood glucose and weight  value
    for (patient of patients) {
      console.log(patient.patientName);

      // Select the curent day's data
      let query = {
        patient_id: patient._id,
        time: { $gte: today },
        time: { $lte: tomorrow },
      };
      console.log(query);

      // sort blood glucose value according to date and time
      let bloodGlucose_result = await bloodGlucoseModel.findOne(query).sort({
        _id: -1,
      });

      let patient_result = await patientModel.findOne(query);

      if (bloodGlucose_result) {
        console.log(bloodGlucose_result);
        // get the latest bloodGlucose value
        patient.today_blood_glucose_level = bloodGlucose_result.value;
        patient.timestamp_blood_glucose_level = bloodGlucose_result.time;
        patient.blood_glucose_level_lower_bound =
          patient_result.bloodGlucose_lowerBound;
        patient.blood_glucose_level_upper_bound =
          patient_result.bloodGlucose_upperBound;
      } else {
        patient.today_blood_glucose_level = 0;
        patient.today_blood_glucose_level = 'No data today';
      }

      // sort weight value according to date and time
      let weight_result = await weightModel.findOne(query).sort({
        _id: -1,
      });
      if (weight_result) {
        console.log(weight_result);
        patient.today_weight = weight_result.value;
        patient.timestamp_weight = weight_result.time;
        patient.weight_lower_bound = 40;
        patient.weight_upper_bound = 85;
      } else {
        patient.today_weight = 0;
        patient.today_weight = 'No data today';
      }
    }
    console.log(patients);
    res.render('Clinician_dashboard', { patients: patients });
  } catch (err) {
    console.log(err);
  }
};



// The function to get the current value of each data and render the patient dashboard
const renderPatientDashboard = async (req, res) => {
  let patient_id = '6267d6bb8b206aade8b24198';
  // find the patient using its id
  let patient = await patientModel.findById(patient_id).lean();
  console.log(patient.patientName);

  const today = new Date(new Date().toDateString()).getTime();
  const tomorrow = today + 24 * 3600 * 1000;
  // Select the curent day's data
  let query = {
    patient_id: patient._id,
    time: { $gte: today },
    time: { $lte: tomorrow },
  };
  console.log(query);
  let bloodGlucose_result = await bloodGlucoseModel.findOne(query).sort({
    _id: -1,
  });

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

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  const data = patientData;
  if (data) {
    res.render('Blood_glucose', {
      onePatient: data,
      layout: 'patient_record_template',
    });
    // request the patient comment and bloodGlucose value from the input
    var glucose_comment = req.query.glucose_comment || 'no comments';
    var patinet_blood_glucose = req.query.patinet_blood_glucose;
    if (glucose_comment && patinet_blood_glucose) {
      let patient_id = '6267d6bb8b206aade8b24198';
      let patientBloodRecord = {
        patient_id,
        value: patinet_blood_glucose,
        comment: glucose_comment,
        time: new Date().getTime(),
      };
      // create the patient bloodRecord
      await bloodGlucoseModel.create({
        ...patientBloodRecord,
      });
    }
  } else {
    res.sendStatus(404);
  }
};

  const renderPatientWeight = (req, res) => {
    res.render('weight', {layout: "patient_record_template"})
  }



const renderPatientLogin = (req, res) => {
  res.render('Patient_login', {
    layout: 'no_layouts'
  })
}

const postPatientLogin = (req, res) => {
  console.log(req.body)
  console.log(req.body.input_email)
}

module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientBloodRecord,
  renderPatientWeight,
  renderPatientLogin,
  postPatientLogin
};

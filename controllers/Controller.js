<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose')
const patientData = require('../models/patient')
const pd = require('../models/patients')
const Patient = mongoose.model('patient')
>>>>>>> 08e8c8cd65254ebefe4fa8e58ba6a6050dc14a60

const patientData = require("../models/patient");

const Patient = mongoose.model("patient");

// handle request to get all clinician data instances
/* const getAllPatientData = (req, res) => {
    res.render('Clinician_dashboard', {data: patientData})
} */

const getAllPatientData = async (req, res) => {
  try {
    // we only need names and photos
    const patients = await Patient.find(
      {},
      {
        patientName: true,
        patientID: true,
        age: true,
        gender: true,
        photo_url: true,
        insistDay: true,
      }
    ).lean();
    console.log(patients);
    res.render("Clinician_dashboard", { patients: patients });
  } catch (err) {
    console.log(err);
  }
};

const renderPatientDashboard = (req, res) => {
<<<<<<< HEAD
  res.render("Patient_Dashboard", {
    data: patientData,
    layout: "patient_template",
  });
};
=======
    res.render('Patient_Dashboard', {
        data: pd,
        layout: 'patient_template'
    })
}


>>>>>>> 08e8c8cd65254ebefe4fa8e58ba6a6050dc14a60

const renderPatientBloodRecord = (req, res) => {
  const data = patientData;
  if (data) {
    res.render("Blood_glucose", {
      onePatient: data,
      layout: "patient_record_template",
    });
    var glucose_comment = req.query.glucose_comment;
    var patinet_blood_glucose = req.query.blood_glucose_level;
    var current_time = new Date();
    var current_year = current_time.getFullYear();
    var current_month = current_time.getMonth() + 1;
    var current_date = current_time.getDate();
    var current_time = current_date + "/" + current_month + "/" + current_year;
    console.log(current_time);
  } else {
    // You can decide what to do if the data is not found.
    // Currently, an empty list will be returned.
    res.sendStatus(404);
  }
};

/* 
const getDataById = (req, res) => {
    const data = cliniciansData.find((data) => data._id === req.params._id)

    if(data){
        res.render('Clinician_dashboard', {oneItem: data})
    }else{
        res.sendStatus(404)
    }
}
*/

/* const insertBloodGlucose = (req, res) => {
    console.log(req.query)
    return res.redirect('back')
}

const insertData = (req, res) => {
    const{patientName, age, gender, blood_glucose_level, weight, insulin_taken, exercise} = req.btn
    patientData.push({patientName, age, gender, blood_glucose_level, weight, insulin_taken, exercise})
    return res.redirect('back')
} */

// exports an object, which contain functions imported by router
module.exports = {
  getAllPatientData,
  renderPatientDashboard,
  renderPatientBloodRecord,
};

const mongoose = require("mongoose");
const patientData = require("../models/patient");
const pd = require("../models/patients");
const Patient = mongoose.model("patient");


const renderClinicianDashboard = async (req, res) => {
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
  res.render("Patient_Dashboard", {
    data: pd,
    layout: "patient_template",
  });
};

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
    res.sendStatus(404);
  }
};

module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientBloodRecord,
};

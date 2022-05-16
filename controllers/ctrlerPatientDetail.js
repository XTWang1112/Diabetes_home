const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');

const patientModel = require('../models/patient');

const renderPatientDetails = async (req, res) => {
  try {

    // 传进来的url里面带id参数即可
    let patient = await patientModel.findById(req.params.id).lean()
    // let patient_id = req.params.patient_id;
    // console.log("获取到的url: "+req.params.id)

    res.render('Patient_details', {
      patient: patient,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const saveSupportMessage = async (req, res) => {
  console.log("saveSupportMessage running")
  let patient_id = '6267d6bb8b206aade8b24198';
  let message_date = new Date();
  let message = req.body.support_message;
  patientModel
    .updateOne({ _id: patient_id }, { support_message: message })
    .then((result) => console.log('Try to change support message'));
  patientModel
  .updateOne({ _id: patient_id }, { support_message_date: message_date.toLocaleDateString() })
  .then((result) => console.log('Try to change support message date'));
};

module.exports = {
  renderPatientDetails,
  saveSupportMessage,
};

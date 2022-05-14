const req = require('express/lib/request');
const res = require('express/lib/response');

const patientModel = require('../models/patient');


const renderPatientDetails = async (req, res) => {
  try {
    // 通过req之类的方法取出指定的patientID
    // search the database by ID
    // const data = patientModel.find((data) => data.id === req.params.id).lean()
    // let patient_id = req.params.patient_id;


    let patient_id = '6267d6bb8b206aade8b24198';

    let patient = await patientModel.findById(patient_id).lean();
    /*
    let query = {
      patient_id: patient_id,
    };
    let patient_result = await patientModel.findOne(query);
    */

    /* 
      根据日期，找出那一天血糖录入的数据。用前面类似query定义的方法。
      let bloodGlucose_result = await bloodGlucoseModel.findOne(query).sort({
        _id: -1,
      });
    */

    res.render('Patient_details', {
      patient: patient,
    });


  } catch (err) {
    console.log(err);
  }
};

 const saveSupportMessage = async(req, res) => {
  let message = req.body.support_message
  let patient_id = '6267d6bb8b206aade8b24198';
  let patient = await patientModel.findById(patient_id).lean();
  console.log(patient);
 }


module.exports = {
  renderPatientDetails,
  saveSupportMessage,
};
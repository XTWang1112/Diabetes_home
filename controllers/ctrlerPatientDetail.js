const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

const patientModel = require('../models/patient');
const recordModel = require('../models/record');
const noteModel = require('../models/clinician_notes');
const notesModel = require('../models/clinician_notes');

const renderPatientDetails = async (req, res) => {
  try {
    const find_id = req.params.id;
    //current patient
    const patient = await patientModel.findById(find_id).lean();
    //current patient' records
    const records = await recordModel
      .find({
        patientObjectID: find_id,
      })
      .sort({ time: -1 })
      .lean();

    //recent patient' note
    const note = await notesModel
      .findOne({
        patientObjectID: find_id,
      })
      .sort({ time: -1 });
    var date = new Date(note.time);
    var dateStr = date.toLocaleDateString();
    console.log('hi' + patient);
    patient.dateStr = dateStr;
    res.render('patient_details', {
      data: {
        patient,
        records,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const setTimeSeries = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id).lean();

    // convert input data to boolean
    // check bloodGlucose
    let bloodGlucose_update = req.body.bloodGlucose_record;
    if (bloodGlucose_update == undefined) {
      bloodGlucose_update = false;
    } else {
      bloodGlucose_update = true;
    }
    // check insulinTaken
    let insulinTaken_update = req.body.insulinTaken_record;
    if (insulinTaken_update == undefined) {
      insulinTaken_update = false;
    } else {
      insulinTaken_update = true;
    }
    // check weight
    let weight_update = req.body.weight_record;
    if (weight_update == undefined) {
      weight_update = false;
    } else {
      weight_update = true;
    }
    // check exercise
    let exercise_update = req.body.exercise_record;
    if (exercise_update == undefined) {
      exercise_update = false;
    } else {
      exercise_update = true;
    }

    // update data
    const matchID = req.params.id;

    await patientModel.updateOne(
      { _id: matchID },
      {
        // _id: req.params.id,
        // bloodGlucose
        bloodGlucose_record: bloodGlucose_update,
        bloodGlucose_lowerBound: req.body.bloodGlucose_lb,
        bloodGlucose_upperBound: req.body.bloodGlucose_ub,

        // insulinTaken
        insulinTaken_record: insulinTaken_update,
        insulinTaken_lowerBound: req.body.insulinTaken_lb,
        insulinTaken_upperBound: req.body.insulinTaken_ub,

        // weight
        weight_record: weight_update,
        weight_lowerBound: req.body.weight_lb,
        weight_upperBound: req.body.weight_ub,

        // exercise
        exercise_record: exercise_update,
        exercise_lowerBound: req.body.exercise_lb,
        exercise_upperBound: req.body.exercise_ub,
      }
    );
    console.log('update finish');

    res.redirect('/clinician/' + req.params.id);
  } catch (err) {
    console.log('error: ' + err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const saveSupportMessage = async (req, res) => {
  const patient_id = req.params.id;
  const message_date = new Date() - 2 * 60 * 60 * 1000;
  const message = req.body.support_message;
  await patientModel
    .updateOne({ _id: patient_id }, { support_message: message })
    .then((result) => console.log('Try to change support message'));
  await patientModel
    .updateOne({ _id: patient_id }, { support_message_date: '2022/5/20' })
    .then((result) => console.log('Try to change support message date'));
  res.redirect('/clinician/' + req.params.id);
};

const saveNote = async (req, res) => {
  const patient_id = req.params.id;
  const time = new Date() - 2 * 60 * 60 * 1000;
  const note = req.body.note;
  newNote = new noteModel({
    patientObjectID: patient_id,
    time: time,
    note: note,
  });
  await newNote.save().then(() => console.log('try to add new note'));
  res.redirect('/clinician/' + req.params.id);
};

// const writeNote = async (req, res, next) => {
//   console.log(req.query.note);

//   const newNote = {
//     time: new Date() - 2 * 60 * 60 * 1000,
//     patientObjectID: req.params.id,
//     note: req.query.note,
//   };

//   const note = await notesModel.create({
//     ...newNote,
//   });
//   console.log('hi');
//   console.log(note);
//   next();
// };

module.exports = {
  renderPatientDetails,
  setTimeSeries,
  saveSupportMessage,
  saveNote,
};

const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

const patientModel = require('../models/patient');
const recordModel = require('../models/record');
const noteModel = require('../models/clinician_notes');

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

    console.log(records);

    res.render('Patient_details', {
      data: {
        patient,
        records,
      },
    });
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     patient,
    //     records,
    //   },
    // });
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

    // 判定是否需要录入该数据
    // bloodGlucose的判定
    let bloodGlucose_update = req.body.bloodGlucose_record;
    if (bloodGlucose_update == undefined) {
      bloodGlucose_update = false;
    } else {
      bloodGlucose_update = true;
    }
    // insulinTaken的判定
    let insulinTaken_update = req.body.insulinTaken_record;
    if (insulinTaken_update == undefined) {
      insulinTaken_update = false;
    } else {
      insulinTaken_update = true;
    }
    // weight的判定
    let weight_update = req.body.weight_record;
    if (weight_update == undefined) {
      weight_update = false;
    } else {
      weight_update = true;
    }
    // exercise的判定
    let exercise_update = req.body.exercise_record;
    if (exercise_update == undefined) {
      exercise_update = false;
    } else {
      exercise_update = true;
    }

    // 更新数据
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
    console.log('更新完毕');

    // 重新定向避免无限循环
    res.redirect('/clinician/' + req.params.id);
  } catch (err) {
    console.log('出错了：' + err);
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
    .updateOne(
      { _id: patient_id },
      { support_message_date: "2022/5/20" }
    )
    .then((result) => console.log('Try to change support message date'));
  res.redirect('/clinician/' + req.params.id);
}

const saveNote = async (req, res) => {
  const patient_id = req.params.id;
  const time = new Date() - 2 * 60 * 60 * 1000;
  const note = req.body.note;
  newNote = new noteModel({
    patientObjectID: patient_id,
    time: time,
    note: note,
  });
  await newNote.save()
  .then(() => console.log("try to add new note"));
  res.redirect('/clinician/' + req.params.id);
}


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

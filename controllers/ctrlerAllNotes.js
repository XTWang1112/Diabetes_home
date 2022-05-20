const req = require('express/lib/request');
const res = require('express/lib/response');
const notesModel = require('../models/clinician_notes');
const patientModel = require('../models/patient');

const renderAllNotes = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id).lean();
    const notes = await notesModel
      .find({
        patientObjectID: req.params.id,
      })
      .lean();
    console.log(notes);
    console.log(patient);
    res.render('all_notes', {
      patient,
      notes,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderAllNotes,
};

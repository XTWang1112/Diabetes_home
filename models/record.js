const mongoose = require('mongoose');

// Declare a Mongoose Schema
const recordSchema = new mongoose.Schema({
  time: Number,
  date: String,
  patientObjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },

  blood_glucose_level: { type: String, default: 'no data today' },
  blood_glucose_level_comment: String,

  weight: { type: String, default: 'no data today' },
  weight_comment: String,

  exercise: { type: String, default: 'no data today' },
  exercise_comment: String,

  insulinTaken: { type: String, default: 'no data today' },
  insulinTaken_comment: String,
});

// Compile the schema into a model
const recordModel = mongoose.model('records', recordSchema);

// Make the model available to other files
module.exports = recordModel;

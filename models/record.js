const mongoose = require('mongoose');

// Declare a Mongoose Schema
const recordSchema = new mongoose.Schema({
  time: String,
  patientID: Number,

  blood_glucose_level: Number,
  blood_glucose_level_comment: String,

  weight: Number,
  weight_comment: String,

  exercise: Number,
  exercise_comment: String,

  insulinTaken: Number,
  insulinTaken_comment: String,

  complete: Boolean,
});

// Compile the schema into a model
const recordModel = mongoose.model('records', recordSchema);

// Make the model available to other files
module.exports = recordModel;

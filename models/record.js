const mongoose = require("mongoose");

// Declare a Mongoose Schema
const recordSchema = new mongoose.Schema({
  time: String,
  patientID: Number,
  blood_glucose_level: Number,
  exercise: Number,
  insulin: Number,
  complete: Boolean,
});

// Compile the schema into a model
const recordModel = mongoose.model("records", recordSchema);

// Make the model available to other files
module.exports = recordModel;


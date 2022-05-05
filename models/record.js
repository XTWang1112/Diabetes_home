const mongoose = require("mongoose");

// Declare a Mongoose Schema
const rrecordSchema = new mongoose.Schema({
  time: String,
  blood_glucose_level: Number,
  exercise: Number,
  insulin: 
});

// Compile the schema into a model
const patientModel = mongoose.model("patients", patientSchema);

// Make the model available to other files
module.exports = patientModel;
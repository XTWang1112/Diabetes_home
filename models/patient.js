const mongoose = require("mongoose");

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
  patientName: String,
  patientID: Number,
  age: Number,
  gender: String,
  photo_url: String,
  insistDay: Number,
  birthday: String,
  city: String,
  email: String,
  address: String,
  register_date: String,
  phone_number: Number,
  postcode: Number,
  clinician: String,

  bloodGlucose_lowerBound: Number,
  bloodGlucose_upperBound: Number,
  weight_lowerBound: Number,
  weight_upperBound: Number,
});

// Compile the schema into a model
const patientModel = mongoose.model("patients", patientSchema);

// Make the model available to other files
module.exports = patientModel;

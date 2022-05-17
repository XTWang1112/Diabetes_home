const mongoose = require('mongoose');
/* const validator = require('validator'); */

const supportMessageSchema = new mongoose.Schema({
  support_message: String,
  date: String,
})

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  patientID: Number,
  age: Number,
  gender: String,
  photo_url: String,
  engagementRate: Number,
  birthday: String,
  register_date: Number,
  support_message: String,
  support_message_date: String,
  
  email: {
    type: String,
    lowercase: true,
    /* validate: [validator.isEmail, 'Please provide a valid email'] */
  },

  password: {
    type: String,
  },

  phoneNumber: Number,
  city: String,
  streetAddress: String,
  postalCode: Number,

  bloodGlucose_lowerBound: Number,
  bloodGlucose_upperBound: Number,
  weight_lowerBound: Number,
  weight_upperBound: Number,
  exercise_lowerBound: Number,
  exercise_upperBound: Number,
  insulinTaken_lowerBound: Number,
  insulinTaken_upperBound: Number,

  bloodGlucose_record: Boolean,
  weight_record: Boolean,
  insulinTaken_record: Boolean,
  exercise_record: Boolean,
});

// Compile the schema into a model
const patientModel = mongoose.model('patients', patientSchema);

// Make the model available to other files
module.exports = patientModel;

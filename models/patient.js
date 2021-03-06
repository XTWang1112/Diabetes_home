const mongoose = require('mongoose');
const validator = require('validator');
/* const validator = require('validator'); */

const supportMessageSchema = new mongoose.Schema({
  support_message: String,
  date: String,
});

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A patient must have a first name'],
    trime: true,
    validate: [validator.isAlpha, 'Patient name must only contain characters'],
  },
  lastName: {
    type: String,
    required: [true, 'A patient must have a last name'],
    trime: true,
    validate: [validator.isAlpha, 'Patient name must only contain characters'],
  },
  gender: {
    type: String,
    required: [true, 'A patient must have a gender'],
    String: {
      values: ['-', 'Female', 'Male'],
      message: 'Only support gender - female or male',
    },
  },
  photo_url: { type: String, default: 'chris.jpg' },
  nickname: { type: String, default: 'Your nickname' },
  insistDay: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  birthday: {
    type: String,
    required: [true, 'A patient must have a birthday'],
    default: '1999/01/01',
  },
  register_date: { type: Number, default: Date.now() },
  clinicianObjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clinicians',
    default: '6286170126fe0c122740a8a5',
  },
  support_message: { type: String, trime: true },
  support_message_date: String,
  theme_preference: { type: String, default: 'green' },

  email: {
    type: String,
    trime: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  password: {
    type: String,
  },

  phoneNumber: {
    type: Number,
    required: [true, 'A patient should have a contact number'],
    maxlength: [11, 'with 65 in front'],
    minlength: [9, 'withou 65 and 0 in front'],
  },
  city: {
    type: String,
    trime: true,
    required: [true, 'A patient should have a city'],
  },
  streetAddress: {
    type: String,
    trime: true,
    required: [true, 'A patient should have a streetAddress'],
  },
  postalCode: {
    type: Number,
    required: [true, 'A patient should have a postal code'],
    maxlength: [4, '4 digit'],
    minlength: [4, '4 digit'],
  },

  bloodGlucose_lowerBound: Number,
  bloodGlucose_upperBound: Number,
  weight_lowerBound: Number,
  weight_upperBound: Number,
  exercise_lowerBound: Number,
  exercise_upperBound: Number,
  insulinTaken_lowerBound: Number,
  insulinTaken_upperBound: Number,

  bloodGlucose_record: { type: Boolean, default: false },
  weight_record: { type: Boolean, default: false },
  insulinTaken_record: { type: Boolean, default: false },
  exercise_record: { type: Boolean, default: false },

  role: { type: String },
});

// Compile the schema into a model
const patientModel = mongoose.model('patients', patientSchema);

// Make the model available to other files
module.exports = patientModel;

const mongoose = require('mongoose');
/* const validator = require('validator'); */

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    patientID: Number,
    age: Number,
    gender: String,
    photo_url: String,
    insistDay: Number,
    birthday: Number,
    support_message: String,

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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compile the schema into a model
const patientModel = mongoose.model('patients', patientSchema);

// Make the model available to other files
module.exports = patientModel;

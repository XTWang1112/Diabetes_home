const mongoose = require('mongoose');
const validator = require('validator');

// Declare a Mongoose Schema
const clinicianSchema = new mongoose.Schema({
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
    photo_url: {
        type: String,
        default: 'clinicianA.png'
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

    edu_background: {
        type: String,
    },

    specialties: {
        type: String,
    },

});



// Compile the schema into a model
const clinicianModel = mongoose.model('clinicians', clinicianSchema);

// Make the model available to other files
module.exports = clinicianModel;
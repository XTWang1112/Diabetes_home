const mongoose = require("mongoose")

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
    patientName: String,
    patientID: Number,
    age: Number,
    gender: String,
    photo_url: String,
    insistDay : Number,
})

// Compile the schema into a model
const Patient = mongoose.model("patient", patientSchema, 'patients')

// Make the model available to other files
module.exports = Patient
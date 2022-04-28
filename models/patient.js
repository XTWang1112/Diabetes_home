const mongoose = require("mongoose")

// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
    patientName: String,
    patientID: Number,
    age: Number,
    gender: String,
    photo_url: String,
    insistDay : Number,

    today_blood_glucose_level:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'bloodGlucoseModel'
    },

    today_weight: Number,
    today_insulin_taken: Number,
    today_exercise: Number
})

// Compile the schema into a model
const patientModel = mongoose.model("patients",patientSchema)

// Make the model available to other files
module.exports = patientModel
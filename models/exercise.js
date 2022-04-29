const mongoose = require("mongoose")

// Declare a bloodGlucose mongoose schema
const exerciseSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
    value: Number,
    time: Number
})

// Compile the schema into bloodGlucose model
const exerciseModel = mongoose.model("exercises", exerciseSchema);

// exports model available to other files
module.exports = exerciseModel
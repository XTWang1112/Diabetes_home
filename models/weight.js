const mongoose = require("mongoose")

// Declare a bloodGlucose mongoose schema
const weightSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
    value: Number,
    time: Number
})

// Compile the schema into bloodGlucose model
const weightModel = mongoose.model("weights", weightSchema);

// exports model available to other files
module.exports = weightModel
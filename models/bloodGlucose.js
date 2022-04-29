const mongoose = require("mongoose");


// Declare a bloodGlucose mongoose schema
const bloodGlucoseSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
    value: Number,
    comment: String,
    time: Number,
    
})

// Compile the schema into bloodGlucose model
const bloodGlucoseModel = mongoose.model("bloodGlucoses", bloodGlucoseSchema);


// exports model available to other files
module.exports = bloodGlucoseModel
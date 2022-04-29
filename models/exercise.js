const mongoose = require("mongoose")

// Declare a exercise mongoose schema
const exerciseSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
    value: Number,
    time: Number
})

// Compile the schema into exercise model
const exerciseModel = mongoose.model("exercises", exerciseSchema);

// exports model available to other files
module.exports = exerciseModel
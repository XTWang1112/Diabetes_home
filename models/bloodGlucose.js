const mongoose = require("mongoose")

// Declare a bloodGlucose mongoose schema
const bloodGlucoseSchema = new mongoose.Schema({
    time: Date,
    value: Number,
    comment: String
})

// Compile the schema into bloodGlucose model
const bloodGlucoseModel = mongoose.model("bloodGlucoses", bloodGlucoseSchema);


// exports model available to other files
module.exports = bloodGlucoseModel
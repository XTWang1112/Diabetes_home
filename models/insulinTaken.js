const mongoose = require("mongoose")

// Declare a insulinTaken mongoose schema
const insulinTakenSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
    value: Number,
    time: Number
})

// Compile the schema into insulinTaken model
const insulineTakenModel = mongoose.model("insulinTakens", insulinTakenSchema);

// exports model available to other files
module.exports = insulineTakenModel
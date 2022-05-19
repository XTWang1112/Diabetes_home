const mongoose = require('mongoose');

// Declare a Mongoose Schema
const notesSchema = new mongoose.Schema({
  time: { type: Number, default: Date.now() - 2 * 60 * 60 * 1000 },
  patientObjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'patients' },
  clinicianObjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clinicians',
  },

  note: { type: String, trim: true },
});

// Compile the schema into a model
const notesModel = mongoose.model('notes', notesSchema);

// Make the model available to other files
module.exports = notesModel;

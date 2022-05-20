const patientModel = require('../models/patient');

const renderChangePassword = async (req, res) => {
  try {
    const patient_id = req.params.id;
    const patient = await patientModel.findById(patient_id).lean();
    console.log(patient);
    res.render('change_password', {
      patient: patient,
      layout: 'patient_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderChangePassword,
};

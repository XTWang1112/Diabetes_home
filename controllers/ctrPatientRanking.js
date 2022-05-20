const patientModel = require('../models/patient');

const renderPatientRanking = async (req, res) => {
  try {
    const top5 = await patientModel.aggregate([
      {
        $sort: { engagementRate: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    const top3 = await patientModel.aggregate([
      {
        $sort: { engagementRate: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    const patient_id = req.params.id;
    const patient = await patientModel.findById(patient_id).lean();
    res.render('patient_ranking', {
      patient: patient,
      data: {
        top5,
        top3,
      },
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
  renderPatientRanking,
};

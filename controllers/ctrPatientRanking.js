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
    res.render('patient_ranking', {
      data: {
        top5,
        top3,
      },
      layout: 'patient_template',
    });
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     top5,
    //     top3,
    //   },
    // });
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

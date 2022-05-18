const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientMe = async (req, res) => {
  try {
    const find_id = req.params.id;
    const patient = await patientModel.findById(find_id).lean();
    const patientReg = await patientModel.findOne(
      { find_id },
      { register_date: 1, _id: 0 }
    );

    const records = await recordModel
      .find(
        {
          find_id,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          }
          return result;
        }
      )
      .clone();

    const oneDay = 24 * 60 * 60 * 1000;

    const diffDays = Math.round(
      Math.abs((new Date().getTime() - patientReg.register_date) / oneDay)
    );
    const engagementRate = Math.round((records.length / diffDays) * 100) / 10;
    console.log(engagementRate);

    await patientModel.updateOne({
      find_id,
      engagementRate: engagementRate,
    });
    res.render('patient_me', {
      patient: patient,
      layout: 'patient_template',
    });
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     records,
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
  renderPatientMe,
};

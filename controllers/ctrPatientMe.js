const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientMe = async (req, res) => {
  try {
    const find_id = '6267d6bb8b206aade8b24198';
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
    const engagementRate = (records.length / diffDays) * 100;

    await patientModel.updateOne({
      find_id,
      engagementRate: engagementRate,
    });
    res.render('patient_me', {
      patient,
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

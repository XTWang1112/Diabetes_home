const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientInsulin = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime();

  const patient = await patientModel.findById(find_id).lean();

  const onePatientInsulin = await recordModel
    .find(
      {
        find_id,
        time: {
          $gte: new Date(search_day).getTime(),
          $lt: new Date(search_day).getTime() + 24 * 3600 * 1000,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        return result;
      }
    )
    .clone();

  if (patient) {
    res.render('Insulin_record', {
      patient,
      layout: 'patient_record_template',
    });

    const insulin_comment = req.query.insulin_comment || 'no comments';
    const patinet_insulin = req.query.patinet_insulin;

    if (insulin_comment && patinet_insulin) {
      const patientInsulin = {
        find_id,
        insulinTaken: patinet_insulin,
        insulinTaken_comment: insulin_comment,
        time: today,
        complete: false,
      };

      if (onePatientInsulin.length === 0) {
        await recordModel.create({
          ...patientInsulin,
        });
      } else if (
        onePatientInsulin.length !== 0 &&
        patient.insulinTaken_record
      ) {
        await recordModel.updateOne({
          find_id,
          time: today,
          insulinTaken: patinet_insulin,
          insulinTaken_comment: insulin_comment,
        });
      }
    }
  }
};

module.exports = {
  renderPatientInsulin,
};

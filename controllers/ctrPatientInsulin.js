const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientInsulin = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime() - 2 * 60 * 60 * 1000;

  const patient = await patientModel.findById(find_id).lean();

  const onePatientInsulin = await recordModel
    .find(
      {
        patientObjectID: find_id,
        time: {
          $gte: new Date(search_day).getTime() - 10 * 3600 * 1000,
          $lt: new Date(search_day).getTime() + 14 * 3600 * 1000,
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

  const onePatientFullRecord = await recordModel
    .find(
      {
        patientObjectID: find_id,
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
    res.render('insulin_record', {
      patient,
      layout: 'patient_record_template',
    });

    const insulin_comment = req.query.insulin_comment || 'no comments';
    const patinet_insulin = req.query.patinet_insulin;

    if (insulin_comment && patinet_insulin) {
      const patientInsulin = {
        patientObjectID: find_id,
        insulinTaken: patinet_insulin,
        insulinTaken_comment: insulin_comment,
        time: today,
      };

      if (onePatientInsulin.length === 0 && patient.insulinTaken_record) {
        await recordModel.create({
          ...patientInsulin,
        });
        // update insistDay
        await patientModel.findOneAndUpdate(
          {
            _id: find_id,
          },
          {
            insistDay: onePatientFullRecord.length,
          }
        );
      } else if (
        onePatientInsulin.length !== 0 &&
        patient.insulinTaken_record
      ) {
        console.log('update😎😎🤓');
        const updated = await recordModel.findOneAndUpdate(
          {
            patientObjectID: find_id,
            time: {
              $gte: new Date(search_day).getTime() - 10 * 3600 * 1000,
              $lt: new Date(search_day).getTime() + 14 * 3600 * 1000,
            },
          },
          {
            time: today,
            insulinTaken: patinet_insulin,
            insulinTaken_comment: insulin_comment,
          }
        );
        // update insistDay
        await patientModel.findOneAndUpdate(
          {
            _id: find_id,
          },
          {
            insistDay: onePatientFullRecord.length,
          }
        );
      }
    }
  }
};

module.exports = {
  renderPatientInsulin,
};

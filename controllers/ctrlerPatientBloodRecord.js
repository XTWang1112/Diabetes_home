const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  // find patient match with the id
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  //remove time difference
  const today = new Date().getTime();
  const patient = await patientModel.findById(find_id).lean();
  const onePatientBloodRecord = await recordModel
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

  // onePatientFullRecord
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
    // render patient blood record page
    res.render('blood_glucose', {
      patient: patient,
      layout: 'patient_record_template',
    });
    const glucose_comment = req.query.glucose_comment || 'no comments';
    const patinet_blood_glucose = req.query.patinet_blood_glucose;
    console.log(onePatientBloodRecord);

    if (glucose_comment && patinet_blood_glucose) {
      const patientBloodRecord = {
        blood_glucose_level: patinet_blood_glucose,
        blood_glucose_level_comment: glucose_comment,
        time: today,
        patientObjectID: find_id,
      };

      if (onePatientBloodRecord.length === 0 && patient.bloodGlucose_record) {
        await recordModel.create({
          ...patientBloodRecord,
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
        onePatientBloodRecord.length !== 0 &&
        patient.bloodGlucose_record
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
            blood_glucose_level: patinet_blood_glucose,
            blood_glucose_level_comment: glucose_comment,
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
        console.log(onePatientBloodRecord);
      }
    }
  }
};

module.exports = {
  renderPatientBloodRecord,
};

const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  // find id 对应的 patient
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}`;
  //remove time difference
  const today = new Date().getTime();
  const patient = await patientModel.findById(find_id).lean();
  const onePatientBloodRecord = await recordModel
    .find(
      {
        patientObjectID: find_id,
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
  console.log(search_day);
  console.log(new Date(new Date(search_day).getTime()));
  console.log(new Date(new Date(search_day).getTime() + 24 * 3600 * 1000));

  if (patient) {
    // 渲染血糖上传页面
    res.render('Blood_glucose', {
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
      } else if (
        onePatientBloodRecord.length !== 0 &&
        patient.bloodGlucose_record
      ) {
        console.log('update😎😎🤓');
        const updated = await recordModel.findOneAndUpdate(
          {
            patientObjectID: find_id,
            time: {
              $gte: new Date(search_day).getTime(),
              $lt: new Date(search_day).getTime() + 24 * 3600 * 1000,
            },
          },
          {
            time: today,
            blood_glucose_level: patinet_blood_glucose,
            blood_glucose_level_comment: glucose_comment,
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

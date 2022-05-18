const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  // find id 对应的 patient
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime();
  const patient = await patientModel.findById(find_id).lean();
  const onePatientBloodRecord = await recordModel
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
        console.log('hi');
        return result;
      }
    )
    .clone();

  if (patient) {
    // 渲染血糖上传页面
    res.render('Blood_glucose', {
      patient: patient,
      layout: 'patient_record_template',
    });
    const glucose_comment = req.query.glucose_comment || 'no comments';
    const patinet_blood_glucose = req.query.patinet_blood_glucose;

    if (glucose_comment && patinet_blood_glucose) {
      const patientBloodRecord = {
        find_id,
        blood_glucose_level: patinet_blood_glucose,
        blood_glucose_level_comment: glucose_comment,
        time: today,
        complete: false,
      };
      if (onePatientBloodRecord.length === 0) {
        await recordModel.create({
          ...patientBloodRecord,
        });
      } else if (
        onePatientBloodRecord.length !== 0 &&
        patient.bloodGlucose_record
      ) {
        await recordModel.updateOne({
          find_id,
          time: today,
          blood_glucose_level: patinet_blood_glucose,
          blood_glucose_level_comment: glucose_comment,
        });
      }
    }
  }
};

module.exports = {
  renderPatientBloodRecord,
};

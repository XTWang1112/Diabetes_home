const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientWeight = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime();

  const patient = await patientModel.findById(find_id).lean();

  const onePatientWeight = await recordModel
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
    // 渲染血糖上传页面
    console.log('hi!!!');
    res.render('Weight_record', {
      patient,
      layout: 'patient_record_template',
    });

    const weight_comment = req.query.weight_comment || 'no comments';
    const patinet_weight = req.query.patinet_weight;

    if (weight_comment && patinet_weight) {
      const patientWeight = {
        patientObjectID: find_id,
        weight: patinet_weight,
        weight_comment: weight_comment,
      };

      if (onePatientWeight.length === 0) {
        await recordModel.create({
          ...patientWeight,
        });
      } else if (onePatientWeight.length !== 0 && patient.weight_record) {
        await recordModel.updateOne({
          patientObjectID: find_id,
          time: today,
          weight: patinet_weight,
          weight_comment: weight_comment,
        });
      }
    }
  }
};

module.exports = {
  renderPatientWeight,
};

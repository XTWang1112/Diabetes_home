const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The fucntion to render patient blood record page
const renderPatientWeight = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth() + 1;
  const current_day = new Date().getDate();
  const today = current_day + '-' + current_month + '-' + current_year;

  const find_id = '6267d6bb8b206aade8b24198';
  const patient_id = 1;
  const search_day = '13-5-2022';

  const onePatientRecord = await patientModel.findById(find_id).lean();

  const onePatientWeight = await recordModel
    .find({
      patient_id,
      time: {
        $gte: new Date(search_day).getTime(),
        $lte: new Date(search_day).getTime() + 24 * 3600 * 1000,
      },
    })
    .lean();

  // 检查数据是否存在，如果不存在返回false
  function checkRecordComplete(checkRecordComplete) {
    if (checkRecordComplete == 'undefined') {
      return false;
    } else {
      return true;
    }
  }

  if (onePatientRecord) {
    // 渲染血糖上传页面
    res.render('Weight_record', {
      onePatientRecord,
      layout: 'patient_record_template',
    });

    // request the patient and bloodGlucose value from the input

    // query 用get post用 req.body.glucose_comment
    const weight_comment = req.query.weight_comment || 'no comments';
    const patinet_weight = req.query.patinet_weight;

    if (weight_comment && patinet_weight) {
      const patientweight = {
        patient_id,
        weight: patinet_weight,
        weight_comment: weight_comment,
        time: today,
        complete: false,
      };

      // 如果今天没有录入数据，则插入一条新的血糖值
      if (!onePatientWeight) {
        await recordModel.create({
          ...patientWeight,
        });
      }
      // 如果今天的血糖值为空(!blood_glu_level 要为true)，同时他被要求录入血糖值的数据(bloodGlu_record要为true)，则更新今天的血糖值
      else if (!onePatientWeight.weight && onePatientRecord.weight_record) {
        await recordModel.updateOne({
          patient_id,
          time: today,
          weight: patinet_weight,
          weight_comment: weight_comment,
        });

        // 如果四个数据都存在，则将complete修改为true
        if (
          checkRecordComplete(onePatientWeight.blood_glucose_level) &&
          checkRecordComplete(onePatientWeight.exercise) &&
          checkRecordComplete(onePatientWeight.weight) &&
          checkRecordComplete(onePatientWeight.insulinTaken)
        ) {
          console.log('complete修改为true');

          await recordModel.updateOne({
            complete: true,
          });
          // 得到complete为true的标记之后，给patient的insist day + 1
          await patientModel.updateOne({
            // insistDay +1
            insistDay: onePatientRecord.insistDay + 1,
          });
        }
      } else {
        // 如果今天的血糖值不为空，则更新今天的血糖值
        await recordModel.updateOne({
          weight: patinet_weight,
          weight_comment: weight_comment,
        });
      }
    }
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  renderPatientWeight,
};

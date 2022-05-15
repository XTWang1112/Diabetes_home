const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The fucntion to render patient blood record page
const renderPatientExercise = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth() + 1;
  const current_day = new Date().getDate();
  const today = current_day + '-' + current_month + '-' + current_year;

  const find_id = '6267d6bb8b206aade8b24198';
  // const patient_id = 1;
  const search_day = '13-5-2022';

  const onePatientRecord = await patientModel.findById(find_id).lean();

  const onePatientExercise = await recordModel
    .find({
      find_id,
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
    res.render('Exercise_record', {
      onePatientRecord,
      layout: 'patient_record_template',
    });

    // request the patient and bloodGlucose value from the input

    // query 用get post用 req.body.glucose_comment
    const exercise_comment = req.query.exercise_comment || 'no comments';
    const patinet_exercise = req.query.patinet_exercise;

    if (exercise_comment && patinet_exercise) {
      const patientExercise = {
        find_id,
        exercise: patinet_exercise,
        exercise_comment: exercise_comment,
        time: today,
        complete: false,
      };

      // 如果今天没有录入数据，则插入一条新的血糖值
      if (!onePatientExercise) {
        await recordModel.create({
          ...patientExercise,
        });
      }
      // 如果今天的血糖值为空(!blood_glu_level 要为true)，同时他被要求录入血糖值的数据(bloodGlu_record要为true)，则更新今天的血糖值
      else if (
        !onePatientExercise.exercise &&
        onePatientRecord.exercise_record
      ) {
        await recordModel.updateOne({
          find_id,
          time: today,
          exercise: patinet_exercise,
          exercise_comment: exercise_comment,
        });

        // 如果四个数据都存在，则将complete修改为true
        if (
          checkRecordComplete(onePatientExercise.blood_glucose_level) &&
          checkRecordComplete(onePatientExercise.weight) &&
          checkRecordComplete(onePatientExercise.exercise) &&
          checkRecordComplete(onePatientExercise.insulinTaken)
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
          exercise: patinet_exercise,
          exercise_comment: exercise_comment,
        });
      }
    }
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  renderPatientExercise,
};
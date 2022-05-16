const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientExercise = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const find_id = '6267d6bb8b206aade8b24198';
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime();

  const onePatientRecord = await patientModel.findById(find_id).lean();

  const onePatientExercise = await recordModel
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

  if (onePatientRecord) {
    res.render('Exercise_record', {
      onePatientRecord,
      layout: 'patient_record_template',
    });

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
      if (onePatientExercise.length === 0) {
        await recordModel.create({
          ...patientExercise,
        });
      } else if (
        onePatientExercise.length !== 0 &&
        onePatientRecord.exercise_record
      ) {
        await recordModel.updateOne({
          find_id,
          time: today,
          exercise: patinet_exercise,
          exercise_comment: exercise_comment,
        });
      }
    }
  }
};

module.exports = {
  renderPatientExercise,
};

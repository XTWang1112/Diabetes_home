const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const renderPatientExercise = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const find_id = req.params.id;
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const today = new Date().getTime() - 2 * 60 * 60 * 1000;

  const patient = await patientModel.findById(find_id).lean();

  const onePatientExercise = await recordModel
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

  if (patient) {
    res.render('Exercise_record', {
      patient,
      layout: 'patient_record_template',
    });

    const exercise_comment = req.query.exercise_comment || 'no comments';
    const patinet_exercise = req.query.patinet_exercise;

    if (exercise_comment && patinet_exercise) {
      const patientExercise = {
        patientObjectID: find_id,
        exercise: patinet_exercise,
        exercise_comment: exercise_comment,
        time: today,
      };

      // 如果今天没有录入数据，则插入一条新的血糖值
      if (onePatientExercise.length === 0 && patient.exercise_record) {
        await recordModel.create({
          ...patientExercise,
        });
      } else if (onePatientExercise.length !== 0 && patient.exercise_record) {
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
            exercise: patinet_exercise,
            exercise_comment: exercise_comment,
          }
        );
      }
    }
  }
};

module.exports = {
  renderPatientExercise,
};

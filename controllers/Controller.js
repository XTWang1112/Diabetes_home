const bcrypt = require('bcrypt');
const patientModel = require('../models/patient');
const clinicianModel = require('../models/clinician');
const recordModel = require('../models/record');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    // find patientModel里面全部病人的数据
    // const patients = await patientModel
    //   .find(
    //     {},
    //     {
    //       firstName: true,
    //       lastName: true,
    //       patientID: true,

    //       gender: true,
    //       photo_url: true,
    //       insistDay: true,
    //       birthday: true,

    //       bloodGlucose_lowerBound: true,
    //       bloodGlucose_upperBound: true,
    //     }
    //   )
    //   .lean();
    const patients = await patientModel.find().lean();
    console.log(patients);

    // const date = new Date();
    // const thisYear = date.getFullYear();
    // const thisMonth = date.getMonth() + 1;
    // const thisDay = date.getDate();
    // const today_date = thisDay + '-' + thisMonth + '-' + thisYear;

    // Get each patient's latest blood glucose and weight  value
    for (patient of patients) {
      let query = {
        patient_id: patient._id,
        // time: { $eq: today_date },
      };

      try {
        patient._id = patient._id.valueOf();
        birth = Date.parse(patient.birthday);
        if (birth) {
          var year = 1000 * 60 * 60 * 24 * 365;
          var currTime = new Date() - 10 * 60 * 60 * 1000;
          var birthday = new Date(birth);
          patient.birthday = parseInt((currTime - birthday) / year);
        }
      } catch (err) {
        console.log(err);
      }
    }

    res.render('clinician_dashboard', {
      patients: patients,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientDashboard = async (req, res) => {
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id).lean();

  const todayData = await recordModel
    .find({
      patientObjectID: patient_id,
      time: {
        $gte: new Date(search_day).getTime() - 10 * 3600 * 1000,
        $lt: new Date(search_day).getTime() + 14 * 3600 * 1000,
      },
    })
    .lean();
  if (patient) {
    var support_message = patient.support_message;
  }

  // console.log(comments);
  res.render('patient_dashboard', {
    patient: patient,
    latestRecord: todayData[0],
    support_message: support_message,
    layout: 'patient_template',
  });


  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     patient: patient,
  //     record: latestRecord,
  //     support_message: support_message,
  //   },
  // });
};

const renderClinicianLogin = (req, res) => {
  try {
    res.render('clinician_login.hbs', {
      layout: 'info_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientWeight = (req, res) => {
  try {
    res.render('weight_record', { layout: 'patient_record_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientInsulin = (req, res) => {
  try {
    res.render('insulin_record', { layout: 'patient_record_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientExercise = (req, res) => {
  try {
    res.render('exercise_record', { layout: 'patient_record_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientLogin = (req, res) => {
  try {
    res.render('patient_login', {
      layout: 'no_layouts',
      loginMessage: '',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientLoginTryagin = (req, res) => {
  try {
    res.render('Patient_login', {
      layout: 'no_layouts',
      loginMessage: 'Please try agine!',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientRanking = (req, res) => {
  try {
    res.render('patient_ranking', {
      layout: 'patient_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const postPatientLogin = (req, res) => {
  const input_email = req.body.email;
  const input_password = req.body.password;
  try {
    patientModel.findOne({ email: input_email }, function (err, foundUser) {
      if (foundUser) {
        bcrypt.compare(
          input_password,
          foundUser.password,
          function (err, result) {
            if (result === true) {
              console.log('Log in success');
              console.log('User ID: ' + foundUser._id);

              res.redirect('/patient/' + foundUser._id);
            } else {
              console.log('Log in fail');
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderPatientClinician = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id).lean();
  const clinician = await clinicianModel.findById(patient.clinician).lean();

  const support_message = patient.support_message;
  const message_date = patient.support_message_date;
  res.render('patient_clinician', {
    patient,
    clinician,
    support_message: support_message,
    message_date: message_date,
    layout: 'patient_template',
  });
};

const renderPatientData = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id).lean();
  const record = await recordModel.find({ patientObjectID: patient_id }).lean();
  record.sort(function (a, b) {
    return a.time - b.time;
  });
  for (let i = 0; i < record.length; i++) {
    const date = new Date(record[i].time).toLocaleDateString();
    record[i].time = date;
    if (record[i].blood_glucose_level == 'no data today') {
      record[i].blood_glucose_level = undefined;
    }
    if (record[i].weight == 'no data today') {
      record[i].weight = undefined;
    }
    if (record[i].insulinTaken == 'no data today') {
      record[i].insulinTaken = undefined;
    }
    if (record[i].exercise == 'no data today') {
      record[i].exercise = undefined;
    }
  }

  if (record) {
    console.log(record);
  }
  try {
    res.render('patient_data', {
      layout: 'patient_template',
      record,
      patient,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderAboutWebsite = (req, res) => {
  try {
    res.render('about_website', { layout: 'info_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderAboutDiabetes = (req, res) => {
  try {
    res.render('about_diabetes', { layout: 'info_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderLoginAboutWebsite = async (req, res) => {
  try {
    const patient_id = req.params.id;
    const patient = await patientModel.findById(patient_id).lean();
    res.render('about_website', { patient, layout: 'patient_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderLoginAboutDiabetes = async (req, res) => {
  try {
    const patient_id = req.params.id;
    const patient = await patientModel.findById(patient_id).lean();
    console.log(patient);
    res.render('about_diabetes', { patient, layout: 'patient_template' });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// change Theme
const changeTheme = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id);
  const theme_preference = patient.theme_preference;
  const currentColor = theme_preference;
  if (currentColor == 'blue') {
    patientModel
      .updateOne({ _id: patient_id }, { theme_preference: 'green' })
      .then((result) =>
        console.log(
          'Try to change color perference to green',
          result.acknowledged
        )
      );
    res.send('green');
  } else if (currentColor == 'green') {
    patientModel
      .updateOne({ _id: patient_id }, { theme_preference: 'blue' })
      .then((result) =>
        console.log(
          'Try to change color perference to blue',
          result.acknowledged
        )
      );
    res.send('blue');
  }
};

const setTheme = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id);
  const theme_preference = patient.theme_preference;
  res.send(theme_preference);
};

const getData = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // let patient_id = req.query.id;
  // let record = await recordModel.find({patientObjectID: patient_id}, {
  //   blood_glucose_level: true,
  //   insulinTaken: true,
  //   weight: true,
  //   exercise: true,
  // }).lean();
  // console.log(record);
  // if (record[0]) {
  //   console.log(record[0]);
  //   res.send(record[0]);
  // } else {
  //   console.log("no");
  //   res.send("no")
  // }
  const current_year = new Date().getFullYear();
  const current_month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const current_day = new Date().getDate();
  const search_day = `${current_year}-${current_month}-${current_day}T00:00:00.000Z`;
  const tdyrecords = await recordModel
    .find(
      {
        time: {
          $gte: new Date(search_day).getTime() - 10 * 3600 * 1000,
          $lt: new Date(search_day).getTime() + 14 * 3600 * 1000,
        },
      },
      {
        patientObjectID: true,
        blood_glucose_level: true,
        insulinTaken: true,
        weight: true,
        exercise: true,
      }
    )
    .lean();
  for (tdyRecord of tdyrecords) {
    const patient = await patientModel.findById(
      { _id: tdyRecord.patientObjectID },
      {
        lastName: true,
        bloodGlucose_lowerBound: true,
        bloodGlucose_upperBound: true,
        weight_lowerBound: true,
        weight_upperBound: true,
        exercise_lowerBound: true,
        exercise_upperBound: true,
        insulinTaken_lowerBound: true,
        insulinTaken_upperBound: true,
      }
    );
    if (patient) {
      tdyRecord.bloodGlucose_lowerBound = patient.bloodGlucose_lowerBound;
      tdyRecord.bloodGlucose_upperBound = patient.bloodGlucose_upperBound;
      tdyRecord.weight_lowerBound = patient.weight_lowerBound;
      tdyRecord.weight_upperBound = patient.weight_upperBound;
      tdyRecord.exercise_lowerBound = patient.exercise_lowerBound;
      tdyRecord.exercise_upperBound = patient.exercise_upperBound;
      tdyRecord.insulinTaken_lowerBound = patient.insulinTaken_lowerBound;
      tdyRecord.insulinTaken_upperBound = patient.insulinTaken_upperBound;
    }
  }
  res.send(tdyrecords);
};

const renderGuestPage = async (req, res) => {
  res.render('guest_page', {
    layout: 'info_template',
  });
};

module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientWeight,
  renderPatientInsulin,
  renderPatientExercise,
  renderPatientLogin,
  renderPatientLoginTryagin,
  postPatientLogin,
  renderPatientRanking,
  renderPatientClinician,
  renderPatientData,
  renderAboutWebsite,
  renderAboutDiabetes,
  renderLoginAboutWebsite,
  renderLoginAboutDiabetes,
  changeTheme,
  setTheme,
  getData,
  renderGuestPage,
  renderClinicianLogin,
};

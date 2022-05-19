const patientModel = require('../models/patient');
const clinicianModel = require('../models/clinician');
const recordModel = require('../models/record');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    // find patientModel里面全部病人的数据
    const patients = await patientModel
      .find(
        {},
        {
          firstName: true,
          lastName: true,
          patientID: true,

          gender: true,
          photo_url: true,
          insistDay: true,
          birthday: true,

          bloodGlucose_lowerBound: true,
          bloodGlucose_upperBound: true,
        }
      )
      .lean();

    for (patient of patients) {
      let query = {
        patient_id: patient._id,
      };

      try {
        patient._id = patient._id.valueOf();
        birth = Date.parse(patient.birthday);
        if (birth) {
          var year = 1000 * 60 * 60 * 24 * 365;
          //remove time difference
          var currTime = new Date() - 2 * 60 * 60 * 1000;
          var birthday = new Date(birth);
          patient.birthday = parseInt((currTime - birthday) / year);
        }
      } catch (err) {
        console.log(err);
      }

      // 通过Unix time 计算病人年龄，暂时不用
      // patient.birthday = Math.floor((new Date().getTime() - patient.birthday) / 1000 / 60 / 60 / 24 / 365);
    }

    res.render('Clinician_dashboard', {
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
  console.log(search_day);
  console.log(todayData);
  const support_message = patient.support_message;
  res.render('Patient_Dashboard', {
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

const renderPatientLogin = (req, res) => {
  try {
    res.render('Patient_login', {
      layout: 'no_layouts',
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
  // 找到这个病人名下的医生
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

  // find the patient using its id
  const record = await recordModel
    .find({
      patientObjectID: patient_id,
    })
    .lean();
  for (let i = 0; i < record.length; i++) {
    const date = new Date(record[i].time).toLocaleDateString();
    record[i].time = date;
  }

  if (record) {
    console.log('get the record from data base, now sending them to render');
  }
  try {
    res.render('patient_data', {
      patient,
      record: record,
      layout: 'patient_template',
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
    res.render('About_website', {
      layout: 'info_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const renderAboutDiabetes = (req, res) => {
  try {
    res.render('About_diabetes', {
      layout: 'info_template',
    });
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
    res.render('About_website', {
      patient,
      layout: 'patient_template',
    });
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
    res.render('About_diabetes', {
      patient,
      layout: 'patient_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// change Theme
const changeTheme = async (req, res) => {
  let patient_id = req.params.id;
  let patient = await patientModel.findById(patient_id);
  theme_preference = patient.theme_preference;
  currentColor = theme_preference;
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
  let patient_id = req.params.id;
  let patient = await patientModel.findById(patient_id);
  theme_preference = patient.theme_preference;
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
  let tdyrecords = await recordModel
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
    let patient = await patientModel.findById(
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
    tdyRecord.lastName = patient.lastName;
    tdyRecord.bloodGlucose_lowerBound = patient.bloodGlucose_lowerBound;
    tdyRecord.bloodGlucose_upperBound = patient.bloodGlucose_upperBound;
    tdyRecord.weight_lowerBound = patient.weight_lowerBound;
    tdyRecord.weight_upperBound = patient.weight_upperBound;
    tdyRecord.exercise_lowerBound = patient.exercise_lowerBound;
    tdyRecord.exercise_upperBound = patient.exercise_upperBound;
    tdyRecord.insulinTaken_lowerBound = patient.insulinTaken_lowerBound;
    tdyRecord.insulinTaken_upperBound = patient.insulinTaken_upperBound;
  }
  res.send(tdyrecords);
};

// use to inite the date in record model
async function addDate() {
  const records = await recordModel.find({}, {}).lean();
  for (record of records) {
    let date = new Date(record.time);
    let dateStr = date.toLocaleDateString();
    recordModel
      .updateOne({ _id: record._id }, { date: dateStr })
      .then((res) => res.acknowledged);
  }
}

const renderGuestPage = async (req, res) => {
  res.render('guest_page', {
    layout: 'info_template',
  });
};

module.exports = {
  renderClinicianDashboard,
  renderPatientDashboard,
  renderPatientLogin,
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

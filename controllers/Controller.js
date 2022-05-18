const patientModel = require('../models/patient');
const recordModel = require('../models/record');

// The function to redner clinician dashboard
const renderClinicianDashboard = async (req, res) => {
  try {
    // find patientModel里面全部病人的数据
    const patients = await patientModel
      .find(
        {},
        {
          patientName: true,
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
        birth = Date.parse(patient.birthday);
        if (birth) {
          var year = 1000 * 60 * 60 * 24 * 365;
          var currTime = new Date();
          var birthday = new Date(birth);
          patient.birthday = parseInt((currTime - birthday) / year);
        }
      } catch (err) {
        console.log(err);
      }

      // 通过Unix time 计算病人年龄，暂时不用
      // patient.birthday = Math.floor((new Date().getTime() - patient.birthday) / 1000 / 60 / 60 / 24 / 365);

      // patient_result在循环的时候，是不会跟着loop的patient切换到下一位
      // let patient_result = await patientModel.findOne(query);

      // 判断血糖是否超标

      // if (bloodGlucose_result) {
      //   // get the latest bloodGlucose value
      //   patient.today_blood_glucose_level = bloodGlucose_result.value;
      //   patient.timestamp_blood_glucose_level = bloodGlucose_result.time;
      //   patient.blood_glucose_level_lower_bound = patient_result.bloodGlucose_lowerBound;
      //   patient.blood_glucose_level_upper_bound = patient_result.bloodGlucose_upperBound;
      // } else {
      //   patient.today_blood_glucose_level = 0;
      //   patient.today_blood_glucose_level = 'No data today';
      // }

      // sort weight value according to date and time
      // let weight_result = await weightModel.findOne(query).sort({
      //   _id: -1,
      // });
      // if (weight_result) {
      //   console.log(weight_result);
      //   patient.today_weight = weight_result.value;
      //   patient.timestamp_weight = weight_result.time;
      //   patient.weight_lower_bound = 40;
      //   patient.weight_upper_bound = 85;
      // } else {
      //   patient.today_weight = 0;
      //   patient.today_weight = 'No data today';
      // }
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
  const patient_id = req.params.id;
  const patient = await patientModel.findById(patient_id).lean();

  const latestRecord = await recordModel
    .find({ patientObjectID: patient_id })
    .sort({ time: -1 })
    .limit(-1)
    .lean();

  const support_message = patient.support_message;
  res.render('Patient_Dashboard', {
    patient: patient,
    latestRecord: latestRecord[0],
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
  const patient = await patientModel.findById(patient_id).lean();
  const support_message = patient.support_message;
  const message_date = patient.support_message_date;
  res.render('patient_clinician', {
    patient,
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
const changeTheme = async(req,res) => {
  let patient_id = '6267d6bb8b206aade8b24198';
  let patient = await patientModel.findById(patient_id);
  theme_preference = patient.theme_preference;
  currentColor = theme_preference;
  if (currentColor == "blue") {
    patientModel.updateOne({_id: patient_id}, {theme_preference: "green"})
    .then((result) => console.log('Try to change color perference to green', result.acknowledged));
    res.send("green");
  } else if (currentColor == "green") {
    patientModel.updateOne({_id: patient_id}, {theme_preference: "blue"})
    .then((result) => console.log('Try to change color perference to blue', result.acknowledged));
    res.send("blue");
  }
}

const setTheme = async(req,res) => {
  let patient_id = '6267d6bb8b206aade8b24198';
  let patient = await patientModel.findById(patient_id);
  theme_preference = patient.theme_preference;
  res.send(theme_preference);
}


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
};

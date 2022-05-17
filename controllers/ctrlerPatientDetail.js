const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');

const patientModel = require('../models/patient');

const renderPatientDetails = async (req, res) => {
  try {

    // 传进来的url里面带id参数即可
    let patient = await patientModel.findById(req.params.id).lean()
    // let patient_id = req.params.patient_id;
    // console.log("获取到的url: "+req.params.id)

    res.render('Patient_details', {
      patient: patient,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const setTimeSeries = async (req, res) => {
  try {

    let patient = await patientModel.findById(req.params.id).lean();
    // console.log("体重的lb是：" + req.body.weight_lb)
    // console.log("全部数据是：" + req.body)

    // patientModel.updateOne({ weight_lowerBound: req.body.weight_lb })

    // console.log("病人： " + patient);
    // var test_id = "628366b430c62f1b691951e0";
    // console.log("病人id： " + test_id);

    var bloodGlucose_update = req.body.bloodGlucose_record;
    // bloodGlucose的判定
    if(bloodGlucose_update == undefined){
      bloodGlucose_update = false;
    }else{
      bloodGlucose_update = true;
    }

    var insulinTaken_update = req.body.insulinTaken_record;
    // insulinTaken的判定
    if(insulinTaken_update == undefined){
      insulinTaken_update = false;
    }else{
      insulinTaken_update = true;
    }

    var weight_update = req.body.weight_record;
    // weight的判定
    if(weight_update == undefined){
      weight_update = false;
    }else{
      weight_update = true;
    }

    var exercise_update = req.body.exercise_record
    // exercise的判定
    if(exercise_update == undefined){
      exercise_update = false;
    }else{
      exercise_update = true;
    }

    console.log("personalid :" + req.params.id);

    console.log("血糖测试" + bloodGlucose_update);
    console.log("血糖lb测试" + req.body.bloodGlucose_lb);
    console.log("血糖ub测试" + req.body.bloodGlucose_ub);

    var patient_id = "628366b430c62f1b691951e0";
    // patientModel
    // .updateOne({ _id: patient_id }, { bloodGlucose_record: bloodGlucose_update }).save();


    console.log("第一次update完毕");

    const matchID = req.params.id;

    await patientModel.updateOne(
      { _id: matchID },
      {
      // _id: req.params.id,
      // bloodGlucose
      bloodGlucose_record: bloodGlucose_update,
      bloodGlucose_lowerBound: req.body.bloodGlucose_lb,
      bloodGlucose_upperBound: req.body.bloodGlucose_ub,

      // insulinTaken
      insulinTaken_record: insulinTaken_update,
      insulinTaken_lowerBound: req.body.insulinTaken_lb,
      insulinTaken_upperBound: req.body.insulinTaken_ub,

      // weight
      weight_record: weight_update,
      weight_lowerBound: req.body.weight_lb,
      weight_upperBound: req.body.weight_ub,

      // exercise
      exercise_record: exercise_update,
      exercise_lowerBound: req.body.exercise_lb,
      exercise_upperBound: req.body.exercise_ub,
    });
    console.log("更新完毕");
    // 以下为测试输出，可删
    // const weight_lb = req.body.weight_lb;
    // const weight_ub = req.body.weight_ub;
    // console.log("测试判定: " + weight_record);
    // console.log("测试布尔值: " + req.body.weight_record);
    // console.log("测试lb" + weight_lb);
    // console.log("测试ub" + weight_ub);
  } catch (err) {
    console.log("出错了：" + err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};




const saveSupportMessage = async (req, res) => {
  console.log("saveSupportMessage running")
  let patient_id = '6267d6bb8b206aade8b24198';
  let message_date = new Date();
  let message = req.body.support_message;
  await patientModel
    .updateOne({ _id: patient_id }, { support_message: message })
    .then((result) => console.log('Try to change support message'));
  await patientModel
  .updateOne({ _id: patient_id }, { support_message_date: message_date.toLocaleDateString() })
  .then((result) => console.log('Try to change support message date'));
};

module.exports = {
  renderPatientDetails,
  setTimeSeries,
  // saveSupportMessage,
};

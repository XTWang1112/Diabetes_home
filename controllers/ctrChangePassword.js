const patientModel = require('../models/patient');
const SALT_FACTOR = 10;
const bcrypt = require('bcrypt');
const { findById } = require('../models/patient');

const renderChangePassword = async (req, res) => {
  try {
    const patient_id = req.params.id;
    const patient = await patientModel.findById(patient_id).lean();
    console.log("渲染修改密码")
    res.render('change_password', {
      patient: patient,
      layout: 'patient_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const changeNewPassword = async(req, res) => {
  const input_old_password = req.body.currentPassword;
  var input_new_password = req.body.newPassword;
  console.log(input_old_password)
  console.log(input_new_password)

  console.log(req.params.id)
  find_id = req.params.id

  const foundUser = await patientModel.findById(find_id)
  

  console.log("这个是foundUser" + foundUser)

  bcrypt.compare(input_old_password, foundUser.password, function(err, result){
    if(result === true){
      bcrypt.genSalt(SALT_FACTOR, (err, salt) =>{
        bcrypt.hash(input_new_password, salt, (err, hash) => {
          foundUser.password = hash;
          foundUser.save();
        })
      })
    }
  })

  
  
  /* let query = patientModel.findOne({_id: find_id}) */
  /* patientModel.findOne({_id: find_id}, function(err, foundUser){
    bcrypt.compare(input_old_password, foundUser.password, function(err, result){
      if(result === true){
        console.log("验证成功")
        var pateint2 = patientModel.findById(find_id)
        console.log("这个病人是" + pateint2)
        bcrypt.hash(input_new_password, SALT_FACTOR, function(err, hash){
          input_new_password = hash */
          /* patientModel.findOne({_id: find_id}, {password: input_new_password}) */
          
          
        /* })
        console.log(input_new_password)
      }
    })
  })  */
  
  /* bcrypt.compare(input_old_password, query.password, function(err, result){
    if(result === true){
      console.log("验证成功")
      bcrypt.hash(input_new_password, SALT_FACTOR, function(err, hash){
        input_new_password = hash
      })
      
    }
  }) */
  /* query.updateOne({password: input_new_password}) */

  /* }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  } */
}

module.exports = {
  renderChangePassword,
  changeNewPassword
};

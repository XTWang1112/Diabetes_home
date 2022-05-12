const req = require('express/lib/request');
const res = require('express/lib/response');
const patientModel = require('../models/patient');

function generatePassword() {
  var chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var passwordLength = 12;
  var password = '';
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

const renderAddPatient = async (req, res, next) => {
  try {
    console.log('注册开始');
    console.log('get');
    res.render('Add_patient');
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const registerPatient = async (req, res) => {
  try {
    console.log('post');
    console.log('start Register');
    console.log(req.body);
    var newPassword = generatePassword();
    console.log(newPassword);

    newPatient = new patientModel({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      phoneNumber: req.body.phone_number,
      streetAddress: req.body.street,
      birthday: req.body.year_birth,
      postalCode: req.body.postal,
      city: req.body.city,
      password: generatePassword(),
    });
    console.log(newPatient);
    await newPatient.save();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/* const registerPatient = async (req, res, next) => {

    try {
        
        const newPatient = new patientModel(
            firstName = req.query.first_name,
            lastName = req.query.last_name,
            email = req.query.email,
            phoneNumber = req.query.phone_number,
            streetAddress = req.query.street,
            birthday = req.query.year_birth,
            postalCode = req.query.postal,
            city = req.query.city,
        );
        await newPatient.save()
        /* return res.redirect("/patient") */
/* console.log(newPatient)
        
    }catch(err){
        return next(err)
    }
}; */

module.exports = {
  renderAddPatient,
  registerPatient,
};

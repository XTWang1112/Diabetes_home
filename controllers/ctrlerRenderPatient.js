const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAddPatient = async (req, res, next) => {
  try {
    console.log('Sign up start');
    res.render('add_patient');
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderAddPatient,
};

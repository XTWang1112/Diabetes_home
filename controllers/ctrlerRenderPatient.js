const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAddPatient = async (req, res, next) => {
  try {
    console.log('注册开始');
    res.render('Add_patient');
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

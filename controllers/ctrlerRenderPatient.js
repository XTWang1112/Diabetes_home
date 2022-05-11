const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAddPatient = async(req, res, next) => {
    console.log("注册开始")
    res.render('Add_patient')
}


module.exports = {
    renderAddPatient,
};
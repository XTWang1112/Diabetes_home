const req = require('express/lib/request');
const res = require('express/lib/response');

// const patientModel = require('../models/patient');


const renderAddPatient = async (req, res) => {
    res.render('Add_patient');
};



module.exports = {
    renderAddPatient,
};
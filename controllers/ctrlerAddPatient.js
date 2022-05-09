const req = require('express/lib/request');
const res = require('express/lib/response');
const patientModel = require('../models/patient');

// const patientModel = require('../models/patient');


const renderAddPatient = async (req, res) => {
    const newPatient = new patientModel({
        firstName: req.body.firstName,
        lastNamae: req.body.lastName,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        streetAddress: req.body.streetAddress,
        postalCode: req.body.postalCode,
        city: req.body.city,
        photo_url: req.body.photo_url,

    });
    newPatient.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("addPatient")
        }
    });

   
    
};



module.exports = {
    renderAddPatient,
};
const req = require('express/lib/request');
const res = require('express/lib/response');
const patientModel = require('../models/patient');

// const patientModel = require('../models/patient');


const renderAddPatient = async (req, res, next) => {

    try {
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
        })
        await newPatient.save()
        return res.redirect("/patient")
    }catch(err){
        return next(err)
    }
    
    
   
    
};



module.exports = {
    renderAddPatient,
};
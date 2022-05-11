const req = require('express/lib/request');
const res = require('express/lib/response');
const patientModel = require('../models/patient');



/* const renderAddPatient = async(req, res, next) => {
    console.log("注册开始")
    res.render('Add_patient')
} */

const registerPatient = async(req, res) => {
    console.log("kaishi")
    console.log(req.body)
    
    newPatient = new patientModel({
        /* firstName: req.body.first_name,
        lastName: req.body.last_name, */
        /* email:  req.body.email,
        phoneNumber: req.body.phone_number,
        streetAddress:  req.body.street,
        birthday:  req.body.year_birth,
        postalCode:  req.body.postal, */
        city:  req.body.city,
    })
    console.log(newPatient)   
    await newPatient.save()
        

        
    
} 


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
    /* renderAddPatient, */
    registerPatient,
};
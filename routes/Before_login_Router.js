const express = require('express');

const Router = express.Router();

const patientModel = require('../models/patient')

const passport = require('passport-local')

const Controller = require('../controllers/Controller');

const utility = require('./patientUtility')

// add a route to handle the get request for all patients' data
Router.get('/about-website', Controller.renderAboutWebsite);
Router.get('/about-diabetes', Controller.renderAboutDiabetes);
Router.get('/login', utility.unLoggedIn, Controller.renderPatientLogin);
// Process login attempt
Router.post(
    '/login', 
    utility.unLoggedIn,
    passport.authenticate("patient-login", {
        failureRedirect: "/guest/login",
        failureflash: true,
    }),  // 如果是坏人，重新回到login page
    (req, res) => {
        console.log('用户 ' + req.patientModel.email)
        res.redirect('/patient/' + patientModel._id)
    }
);


// export the router
module.exports = Router;

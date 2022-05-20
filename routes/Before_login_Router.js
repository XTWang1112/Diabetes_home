const express = require('express');

const Router = express.Router();

const patientModel = require('../models/patient');

const Controller = require('../controllers/Controller');
const passport = require('passport');

const utility = require('./patientUtility');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderGuestPage);
Router.get('/about-website', Controller.renderAboutWebsite);
Router.get('/about-diabetes', Controller.renderAboutDiabetes);
Router.get('/clinician-login', Controller.renderClinicianLogin);
Router.post(
    '/clinician-login',
    utility.unLoggedIn,
    passport.authenticate("clinician-login", {
        failureRedirect: "/guest/clinician-login",
        failureFlash: true,
    }),
    (req, res) => {
        console.log("这里是医生")
        res.redirect('/clinician')
    }

)
Router.get('/login', utility.unLoggedIn, Controller.renderPatientLogin);
Router.get(
  '/login/tryagine',
  utility.unLoggedIn,
  Controller.renderPatientLoginTryagin
);
// Process login attempt
Router.post(
  '/login',
  utility.unLoggedIn,
  passport.authenticate('patient-login', {
    /* successRedirect: '/patient/62864c7a96d8e97f2078fc9c', */
    failureRedirect: '/guest/login',
    failureFlash: true,
  }), // 如果是坏人，重新回到login page
  (req, res) => {
    console.log('用户 ');
    res.redirect('/patient/' + req.user._id.toString());
  }
);

// export the router
module.exports = Router;

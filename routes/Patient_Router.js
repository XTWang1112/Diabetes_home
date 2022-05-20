// const { Router } = require('express')
const express = require('express');

const utility = require('./patientUtility')

const Router = express.Router();

const Controller = require('../controllers/Controller');
const ctrlerPatientBloodRecord = require('../controllers/ctrlerPatientBloodRecord');
const ctrlerPatientExercise = require('../controllers/ctrlerPatientExercise');
const ctrlerPatientWeight = require('../controllers/ctrPatientWeight');
const ctrlerPatientInsulin = require('../controllers/ctrPatientInsulin');
const ctrlerPatientMe = require('../controllers/ctrPatientMe');
const ctrlerPatientRanking = require('../controllers/ctrPatientRanking');
const ctrChangePassword = require('../controllers/ctrChangePassword');

// header-nav
Router.get(
    '/:id', 
    utility.isLoggedIn,
    Controller.renderPatientDashboard);
Router.get('/:id/about-website', utility.isLoggedIn, Controller.renderLoginAboutWebsite);
Router.get('/:id/about-diabetes', utility.isLoggedIn, Controller.renderLoginAboutDiabetes);
Router.get('/:id/change-password', utility.isLoggedIn, ctrChangePassword.renderChangePassword);
//data input
Router.get('/:id/weight', utility.isLoggedIn, ctrlerPatientWeight.renderPatientWeight);
Router.get('/:id/insulin', utility.isLoggedIn, ctrlerPatientInsulin.renderPatientInsulin);
Router.get('/:id/exercise', utility.isLoggedIn, ctrlerPatientExercise.renderPatientExercise);
Router.get(
  '/:id/blood-glucose',
  ctrlerPatientBloodRecord.renderPatientBloodRecord
);
//side nav
Router.get('/:id/ranking', ctrlerPatientRanking.renderPatientRanking);
Router.get('/:id/me', ctrlerPatientMe.renderPatientMe);
Router.get('/:id/clinician', Controller.renderPatientClinician);
Router.get('/:id/data', Controller.renderPatientData);

// export the router
module.exports = Router;

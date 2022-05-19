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
Router.get('/:id/about-website', Controller.renderLoginAboutWebsite);
Router.get('/:id/about-diabetes', Controller.renderLoginAboutDiabetes);
Router.get('/:id/change-password', ctrChangePassword.renderChangePassword);
//data input
Router.get('/:id/weight', ctrlerPatientWeight.renderPatientWeight);
Router.get('/:id/insulin', ctrlerPatientInsulin.renderPatientInsulin);
Router.get('/:id/exercise', ctrlerPatientExercise.renderPatientExercise);
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

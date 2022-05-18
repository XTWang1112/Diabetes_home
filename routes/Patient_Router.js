// const { Router } = require('express')
const express = require('express');

const Router = express.Router();

const Controller = require('../controllers/Controller');
const ctrlerPatientBloodRecord = require('../controllers/ctrlerPatientBloodRecord');
const ctrlerPatientExercise = require('../controllers/ctrlerPatientExercise');
const ctrlerPatientWeight = require('../controllers/ctrPatientWeight');
const ctrlerPatientInsulin = require('../controllers/ctrPatientInsulin');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderPatientDashboard);

Router.get('/about-website', Controller.renderLoginAboutWebsite);

Router.get('/about-diabetes', Controller.renderLoginAboutDiabetes);

Router.get('/weight', ctrlerPatientWeight.renderPatientWeight);

Router.get('/insulin', ctrlerPatientInsulin.renderPatientInsulin);

Router.get('/exercise', ctrlerPatientExercise.renderPatientExercise);

Router.get('/ranking', Controller.renderPatientRanking);

Router.get('/me', Controller.renderPatientMe);

Router.get('/clinician', Controller.renderPatientClinician);

Router.get('/data', Controller.renderPatientData);
Router.get('/blood_glucose', ctrlerPatientBloodRecord.renderPatientBloodRecord);

// export the router
module.exports = Router;

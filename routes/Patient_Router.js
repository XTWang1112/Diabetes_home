// const { Router } = require('express')
const express = require('express');

const Router = express.Router();

const Controller = require('../controllers/Controller');
const ctrlerPatientBloodRecord = require('../controllers/ctrlerPatientBloodRecord');
const ctrlerPatientExercise = require('../controllers/ctrlerPatientExercise');
const ctrlerPatientWeight = require('../controllers/ctrPatientWeight');
const ctrlerPatientInsulin = require('../controllers/ctrPatientInsulin');
const ctrlerPatientMe = require('../controllers/ctrPatientMe');
const ctrlerPatientRanking = require('../controllers/ctrPatientRanking');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderPatientDashboard);

Router.post('/login', Controller.postPatientLogin);

Router.get('/about-website', Controller.renderLoginAboutWebsite);

Router.get('/about-diabetes', Controller.renderLoginAboutDiabetes);

Router.get('/weight', ctrlerPatientWeight.renderPatientWeight);

Router.get('/insulin', ctrlerPatientInsulin.renderPatientInsulin);

Router.get('/exercise', ctrlerPatientExercise.renderPatientExercise);

Router.get('/ranking', ctrlerPatientRanking.renderPatientRanking);

Router.get('/me', ctrlerPatientMe.renderPatientMe);

Router.get('/clinician', Controller.renderPatientClinician);

Router.get('/data', Controller.renderPatientData);
Router.get('/blood_glucose', ctrlerPatientBloodRecord.renderPatientBloodRecord);

// export the router
module.exports = Router;

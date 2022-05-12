// const { Router } = require('express')
const express = require('express');

const Router = express.Router();

const Controller = require('../controllers/Controller');
const ctrlerPatientBloodRecord = require('../controllers/ctrlerPatientBloodRecord');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderPatientDashboard);

//pathway should not from patient
FIXME: Router.get('/login', Controller.renderPatientLogin);

Router.post('/login', Controller.postPatientLogin);

Router.get('/weight', Controller.renderPatientWeight);

Router.get('/insulin', Controller.renderPatientInsulin);

Router.get('/exercise', Controller.renderPatientExercise);

Router.get('/ranking', Controller.renderPatientRanking);

Router.get('/me', Controller.renderPatientMe);

Router.get('/clinician', Controller.renderPatientClinician);

Router.get('/data', Controller.renderPatientData);
Router.get('/blood_glucose', ctrlerPatientBloodRecord.renderPatientBloodRecord);

// export the router
module.exports = Router;

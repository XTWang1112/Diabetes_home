const express = require('express');
const Router = express.Router();

const Controller = require('../controllers/Controller');
// controller = ctrler
const ctrlerPatientDetail = require('../controllers/ctrlerPatientDetail');
const ctrlerAddPatient = require('../controllers/ctrlerAddPatient');
const ctrlerRenderPatient = require('../controllers/ctrlerRenderPatient');
const ctrlerAllNotes = require('../controllers/ctrlerAllNotes');
const ctrlerAllComments = require('../controllers/ctrlerAllComments');

const { renderPatientDetails } = require('../controllers/ctrlerPatientDetail');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderClinicianDashboard);
Router.get('/add-patient', ctrlerRenderPatient.renderAddPatient);
// Router.post('/add-patient', ctrlerAddPatient.registerPatient);

Router.get('/all-comments', ctrlerAllComments.renderAllComments);
Router.get('/patientname', ctrlerPatientDetail.renderPatientDetails);
Router.get('/patientname/all-notes', ctrlerAllNotes.renderAllNotes);




// export the router
module.exports = Router;

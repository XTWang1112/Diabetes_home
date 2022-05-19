const express = require('express');

const Router = express.Router();

const Controller = require('../controllers/Controller');

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderGuestPage);
Router.get('/about-website', Controller.renderAboutWebsite);
Router.get('/about-diabetes', Controller.renderAboutDiabetes);
Router.get('/login', Controller.renderPatientLogin);
Router.get('/clinician-login', Controller.renderClinicianLogin);

// export the router
module.exports = Router;

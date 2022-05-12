const express = require('express');

const Router = express.Router();

const Controller = require('../controllers/Controller');

// add a route to handle the get request for all patients' data
Router.get('/about-website', Controller.renderAboutWebsite);
Router.get('/about-diabetes', Controller.renderAboutDiabetes);
Router.get('/login', Controller.renderPatientLogin);

// export the router
module.exports = Router;

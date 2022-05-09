// const { Router } = require('express')
const express = require("express");

const Router = express.Router();

const Controller = require("../controllers/Controller");

// add a route to handle the get request for all patients' data
Router.get("/", Controller.renderPatientDashboard);

Router.get("/blood_glucose", Controller.renderPatientBloodRecord);

//pathway should not from patient
FIXME: Router.get("/login", Controller.renderPatientLogin);

Router.post("/login", Controller.postPatientLogin);

Router.get("/weight", Controller.renderPatientWeight);

Router.get("/insulin", Controller.renderPatientInsulin);

Router.get("/excercise", Controller.renderPatientExcercise);

Router.get("/ranking", Controller.renderPatientRanking);

Router.get("/me", Controller.renderPatientMe);

Router.get("/clinician", Controller.renderPatientClinician);

Router.get("/data", Controller.renderPatientData);

// export the router
module.exports = Router;

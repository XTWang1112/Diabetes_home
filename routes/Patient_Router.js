// const { Router } = require('express')
const express = require('express')

const Router = express.Router()

const Controller = require('../controllers/Controller')

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderPatientDashboard)

Router.get('/blood_glucose', Controller.renderPatientBloodRecord)

Router.get('/login', Controller.renderPatientLogin)

Router.post('/login', Controller.postPatientLogin)

Router.get("/weight", Controller.renderPatientWeight)

Router.get("/insulin", Controller.renderPatientInsulin)

Router.get("/excercise", Controller.renderPatientExcercise)
// export the router
module.exports = Router

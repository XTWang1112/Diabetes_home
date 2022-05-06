// const { Router } = require('express')
const express = require('express')

const Router = express.Router()

const Controller = require('../controllers/Controller')
const ctrlerPatientBloodRecord = require('../controllers/ctrlerPatientBloodRecord')

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderPatientDashboard)

Router.get('/blood_glucose', ctrlerPatientBloodRecord.renderPatientBloodRecord)

// export the router
module.exports = Router

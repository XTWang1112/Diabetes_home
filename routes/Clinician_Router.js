// const { Router } = require('express')
const express = require('express')

const Router = express.Router()

const Controller = require('../controllers/Controller')

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderClinicianDashboard)

// add a new JSON object to the database
// Router.post('/', Controller.insertData)

// export the router
module.exports = Router

const express = require('express')

const Router = express.Router()

const Controller = require('../controllers/Controller')

// add a route to handle the get request for all patients' data
Router.get('/', Controller.renderClinicianDashboard)

// export the router
module.exports = Router

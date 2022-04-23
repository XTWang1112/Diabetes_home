const express = require('express')

const peopleRouter = express.Router()

const peopleControllers = require('../controllers/peopleControllers')

// add a route to handle the get request for all patients' data
peopleRouter.get('/', peopleControllers.getAllPatientData)

// add a new JSON object to the database
peopleRouter.post('/', peopleControllers.insertData)


// export the router
module.exports = peopleRouter
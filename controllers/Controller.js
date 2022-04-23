const patientData = require('../models/patients.js')

// handle request to get all clinician data instances
const getAllPatientData = (req, res) => {
    res.render('Clinician_dashboard', {data: data})
}


/* 
const getDataById = (req, res) => {
    const data = cliniciansData.find((data) => data._id === req.params._id)

    if(data){
        res.render('Clinician_dashboard', {oneItem: data})
    }else{
        res.sendStatus(404)
    }
}
*/

const insertData = (req, res) => {
    const{patientName, age, gender, blood_glucose_level, weight, insulin_taken, exercise} = req.btn
    patientData.push({patientName, age, gender, blood_glucose_level, weight, insulin_taken, exercise})
    return res.redirect('back')
}



// exports an object, which contain functions imported by router
module.exports ={
    getAllPatientData,
    insertData,
}



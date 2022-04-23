const cliniciansData = require('../models/clinicians.json')

const getAllCliniciansData = (req, res) => {
    const data = cliniciansData.find((data) => data._id === req.params._id)

    if(data){
        res.render('Clinician_dashboard', {oneItem: data})
    }else{
        res.sendStatus(404)
    }
}
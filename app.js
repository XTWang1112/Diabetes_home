const exphbs = require('express-handlebars')

// Import express
const express = require('express')

// Set your app up as an express app
const app = express()

// configure Handlebars
app.engine('hbs', exphbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: 'main',
    extname: 'hbs'
}));


// set Handlebars view engine
app.set('view engine', 'hbs')

app.use(express.static('public'))

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })) // only needed for URL-encoded input

// link to our router
const Router = require('./routes/Router')

// the demo routes are added to the end of the '/clinician' path
app.use('/Clinician_dashboard', Router)

// render Clinician_dashboard page 
app.get('/Clinician_dashboard', (req, res) => {
    res.render('Clinician_dashboard.hbs', {
        title: 'Clinician Dashboard',
    })
})


// render Clinician_dashboard page
// app.get('/Patient_dashboard', (req, res) => {
//     res.render('Patient_dashboard.hbs', {
//         title: 'Patient Dashboard',
//         layout: 'Patient-template.hbs'
//     })
// })


// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
})

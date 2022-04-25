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

var current_time = new Date();
var current_year = current_time.getFullYear();
var current_month = current_time.getMonth() + 1;
var current_date = current_time.getDate();
var current_time = current_date + "/" + current_month + "/" + current_year;

var hbs = require('handlebars');
hbs.registerHelper('compare', function(a,options){
    if(a == current_time){
       return options.fn(this);
    }else{
      return options.inverse(this);
   }
});	

hbs.registerHelper('compare_safety_range', function(a,b,c,options){
    // a is record value, b is lower bound, c is upper bound
    if(a >= b && a <= c){
       return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
});



app.use(express.static('public'))

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })) // only needed for URL-encoded input

// link to our router
const Router = require('./routes/Router')
const PatientRouter = require('./routes/Patient_Router')

// the demo routes are added to the end of the '/clinician' path
app.use('/Clinician_dashboard', Router)
app.use('/patient', PatientRouter)


// render Clinician_dashboard page 
app.get('', (req, res) => {
    res.send("<h1>The first page is under developing: please view http://localhost/patient and http://localhost/Clinician_dashboard</h1>")
})

app.get('/Clinician_dashboard', (req, res) => {
    res.render('Clinician_dashboard.hbs', {
        title: 'Clinician Dashboard',
    })
})


// app.get('/Patient', (req, res) => {
//     res.render('Patient_Dashboard', {
//         layout: 'patient-template'
//     })
// })





// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(80, () => {
    console.log('Demo app is listening on port 80')
})

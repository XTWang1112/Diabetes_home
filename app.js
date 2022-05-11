// Import express-handlebars
const exphbs = require('express-handlebars');

// Import express
const express = require('express');

// Set app as our server
const app = express();

/* const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

app.use(flash()) */

// configure Handlebars
app.engine(
  'hbs',
  exphbs.engine({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'clinician_template',
    extname: 'hbs',
  })
);

// set Handlebars view engine
app.set('view engine', 'hbs');

// connect to database
require('./models/db.js');

var hbs = require('handlebars');
// get system time and compare it in the handlebars view model
hbs.registerHelper('compare', function (a, options) {
  var current_time = new Date();
  var current_year = current_time.getFullYear();
  var current_month = current_time.getMonth() + 1;
  var current_date = current_time.getDate();
  var current_time = current_date + '/' + current_month + '/' + current_year;
  if (a == current_time) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('compare_safety_range', function (a, b, c, options) {
  // a is record value, b is lower bound, c is upper bound
  if (a >= b && a <= c) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// set gloabal static resource
app.use(express.static(__dirname + '/public'));

// Set up to handle POST requests
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })); // only needed for URL-encoded input

// link to our routers
const ClinicianRouter = require('./routes/Clinician_Router');
const PatientRouter = require('./routes/Patient_Router');

// the demo routes are added to the end of the '/clinician' path
app.use('/clinician', ClinicianRouter);
app.use('/patient', PatientRouter);


// set constant for patientModel
const patientModel = require('./models/patient');

// 注册用户
app.post('/add-patient', async (req, res) => {  // using POST for Postman demo
  const newPatient = new patientModel({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email:  req.body.email,
    phoneNumber: req.body.phone_number,
    streetAddress:  req.body.street,
    birthday:  req.body.year_birth,
    postalCode:  req.body.postal,
    city:  req.body.city,
  })
  newPatient.save((err, patient) => {
    if (err) res.send(err)
    return res.send(patient)
  })
})




// render Clinician_dashboard page
app.get('', (req, res) => {
  res.send(
    "<h1>The home page is under developing, please view: <br><a href='https://webbbbers-diabetes-home.herokuapp.com/patient'>https://webbbbers-diabetes-home.herokuapp.com/patient</a><br><a href='https://webbbbers-diabetes-home.herokuapp.com/clinician'>https://webbbbers-diabetes-home.herokuapp.com/clinician</a></h1>."
  );
});

// Tells the app to listen on port 8080 and logs that information to the console.
app.listen(process.env.PORT || 8080, () => {
  console.log('Diabetes@Home listening on port 8080');
});

/* const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const patientModel = require('../models/patient');


module.exports = (passport) => {
    // Store user information in session
    passport.serializeUser((user, done) => {
        done(null, {_id: user._id, role: user.role})
    })

    // Retrieve user information from session
    passport.deserializeUser((login, done) => {
        if(login.role === "patient"){
            patientModel.findById(login._id, (err, user) => {
                return done(err, user)
            })
        } else {
            return done("This user does not have role", null)
        }
    })

    passport.use(
        "patient-login",
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        (req, email, password, done) => {
            process.nextTick(() => {
                patientModel.findOne({'email': email.toLowerCase()}, async(err, patient) => {
                    if(err){
                        return done(err);
                    }else if(!patient){
                        return done(null, false, req.flash('loginMessage', 'No user found'));
                    }else if(!await bcrypt.compare(password, patient.password)){
                        return done(null, fasle, req.flash('loginMessage', 'Oops, Wrong password!'));
                    }else{
                        return done(null, patient, req.flash('loginMessage', 'Login successful'));
                    }
                })
            })
        }
        )
    )
} */
















/* const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require('passport')

const patientModel = require('../models/patient');

// 将用户的信息存到session里面（id和role）
passport.serializeUser((user, done) => {
    done(null, {_id: user._id, role: user.role})
})

// 将用户的信息从session中取出来
passport.deserializeUser((login, done) => {
    if(login.role === "patient"){
        patientModel.findById(login._id, (err, user) => {
            return done(err. user)
        })
    } else{
        return done("This user does not have role", null)
    }
})

passport.use(
    "patient-login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    (req, email, password, done) => {
        process.nextTick(() =>{
            patientModel.findOne({'email': email.toLowerCase()}, async(err, patient) => {
                if(err){
                    return done(err);
                }else if(!patient){
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }else if(!(password == patient.password)){
                    return done(null, false, req.flash('loginMessage', 'Wrong password!'));
                }else{
                    return done(null, patient, req.flash('loginMessage', 'login successful'));
                }
            });
        })
    })
)
 */
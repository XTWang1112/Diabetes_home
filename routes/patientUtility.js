function unLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/patient/:id');
    }
    next();
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/patient/login');
}

module.exports = {
    isLoggedIn,
    unLoggedIn
}
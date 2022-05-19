function unLoggedIn(req, res, next){
    console.log("验证1")
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        console.log("验证")
        return res.redirect('/patient/'+ req.user._id);
    }
    next();
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/guest/login');
}

module.exports = {
    isLoggedIn,
    unLoggedIn
}
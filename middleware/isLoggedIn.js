const isLoggedIn = (req, res, next) => {

    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/user/login');
    } 
};

module.exports = isLoggedIn;
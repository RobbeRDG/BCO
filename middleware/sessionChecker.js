const sessionChecker = (req, res, next) => {

    if (req.session.user && req.cookies.user_sid) {
        const user = req.session.user;
        res.render('user', { user: user });
    } else {
        next();
    } 
};

module.exports = sessionChecker
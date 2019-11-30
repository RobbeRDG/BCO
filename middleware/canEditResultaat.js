const canEditResultaat = (req, res, next) => {

    if (!req.session.user || !req.cookies.user_sid) {
        res.render('geen_toegang')
    } else {
        next();
    } 
};

module.exports = canEditResultaat;
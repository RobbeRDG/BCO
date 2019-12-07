const canDelete = async(req, res, next) => {

    if (req.session.user && req.cookies.user_sid) {
         const resultaat = await Resultaten.findOne({ '_id': req.params.id })
         if (resultaat.Maker == req.session.user.id) next()
    } else {
        res.redirect('/user/me/resultaten')
    } 
};

module.exports = canDelete;
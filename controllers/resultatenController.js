var Resultaten = require('../model/resultaten');
const validator = require('express-validator');
var async = require('async');

// Display list of all resultatens.
exports.resultaten_list = function(req, res, next) {

  Resultaten.find({}, 'Team1 ScoreT1 ScoreT2 Team2')
    .populate('resultaten')
    .exec(function (err, list_resultaten) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('resultaten_list', { title: 'Resultaten List', resultaten_list: list_resultaten });
    });
    
};

//Weergeven van persoonlijke resultaten
exports.persoonlijke_resultaten_list = function(req, res, next) {
    const id = req.session.user.id
    Resultaten.find({'Maker' : id }, 'Team1 ScoreT1 ScoreT2 Team2')
      .populate('resultaten')
      .exec(function (err, list_resultaten) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('resultaten_list', { title: 'Resultaten List', resultaten_list: list_resultaten });
      });
      
  };

// Display resultaten create form on GET.
exports.resultaten_create_get = function(req, res) {
    res.render('resultaat_form');
};

// Display detail page for a specific book.
exports.resultaten_detail = function(req, res, next) {
	async.parallel({
		resultaten: function(callback) {
            Resultaten.findById(req.params.id)
              .exec(callback);
        },
		
		
	},function(err, results) {
        if (err) { return next(err); }
        if (results.resultaten==null) { // No results.
            var err = new Error('Resultaat not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        var canDelete = false
        if(req.session.user) {
            canDelete = req.session.user.id == results.resultaten.Maker ? true : false;
        }
        res.render('resultaten_detail', { title: 'Resultaten Detail', resultaten: results.resultaten, canDelete: canDelete } );
    });

};


// Handle resultaten create on POST.
exports.resultaten_create_post = [
    // Check if not empty
    validator.body('team1', 'teamnaam team 1 verplicht').isLength({ min: 1 }).trim(),
    validator.body('team2', 'teamnaam team 2 verplicht').isLength({ min: 1 }).trim(),
    validator.body('score_t1', 'score team 1 verplicht').isLength({ min: 1 }).trim(),
    validator.body('score_t2', 'score team 2 verplicht').isLength({ min: 1 }).trim(),

    //Check if numeric
    validator.body('score_t1', 'Score team 1 is geen nummer').isNumeric(),
    validator.body('score_t2', 'Score team 2 is geen nummer').isNumeric(),
    

    //Sanitize body
    validator.sanitizeBody( 'team1' ).escape(),
    validator.sanitizeBody( 'team2' ).escape(),
    validator.sanitizeBody( 'score_t1' ).escape(),
    validator.sanitizeBody( 'score_t2' ).escape(),
    validator.sanitizeBody( 'opmerking' ).escape(),

    async(req, res) => {
        // resultaat opslaan
        const errors = validator.validationResult(req)

        try {
            const resultaat = new Resultaten({
                Team1: req.body.team1,
                Team2: req.body.team2,
                ScoreT1 : req.body.score_t1,
                ScoreT2: req.body.score_t2,
                Opm: req.body.opmerking,
                Maker: req.session.user.id
            });
            if(!errors.isEmpty()){
                res.render('resultaat_form', {
                        team1: req.body.team1,
                        team2: req.body.team2,
                        score_t1 : req.body.score_t1,
                        score_t2: req.body.score_t2,
                        opmerking: req.body.opmerking,
                        errors: errors.array()
                    });
                return;
            }
            await resultaat.save();
            res.redirect('/resultaten')
        } catch (error) {
            console.log(error)
            res.render('resultaat_form', {topError: "Er is iets fout gegaan" });
        }
    }
]




// Display resultaten delete form on GET.
exports.resultaten_delete_get = async(req, res) => {
    try {
        await Resultaten.deleteOne({ '_id': req.params.id })
        res.redirect('/user/me/resultaten')
    } catch(error) {
        console.log(error)
        //res.redirect('/user/me/resultaten')
    }
};

/*
// Handle resultaten delete on POST.
exports.resultaten_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: resultaten delete POST');
};


// Display resultaten update form on GET.
exports.resultaten_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: resultaten update GET');
};

// Handle resultaten update on POST.
exports.resultaten_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: resultaten update POST');
};

*/

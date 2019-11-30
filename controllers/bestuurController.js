var Bestuur = require('../model/bestuur');
var async = require('async');

// Display list of all Books.
exports.bestuur_list = function(req, res, next) {

  Bestuur.find({}, 'first_name family_name functie ')
    .populate('bestuur')
    .exec(function (err, list_bestuur) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('bestuur_list', { title: 'Ons Bestuur', bestuur_list: list_bestuur });
    });
    
};

// Display detail page for a specific bestuurslid.
exports.bestuur_detail = function(req, res, next) {
	async.parallel({
		bestuurslid: function(callback) {
			Bestuur.findById(req.params.id)
			  .exec(callback);
		},
	}, function(err,results){
		if(err) {return next(err);}
		if(results.bestuurslid==null){
		  var err = new Error('Bestuurslid not found');
		  err.status = 404;
		  return next(err);
		}
	    res.render('bestuur_detail', {title: 'Bestuurslid', bestuurslid: results.bestuurslid});
	});
	

};

// Display bestuurslid create form on GET.
exports.bestuur_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid create GET');
};

// Handle bestuurslid create on POST.
exports.bestuur_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid create POST');
};

// Display bestuurslid delete form on GET.
exports.bestuur_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid delete GET');
};

// Handle bestuurslid delete on POST.
exports.bestuur_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid delete POST');
};

// Display bestuurslid update form on GET.
exports.bestuur_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid update GET');
};

// Handle bestuurslid update on POST.
exports.bestuur_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bestuurslid update POST');
};
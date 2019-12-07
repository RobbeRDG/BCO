const Bestuur = require('../model/bestuur');
const Resultaten = require('../model/resultaten');
const Genre = require('../model/home');
const async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        bestuur_count: function(callback) {
            Bestuur.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        resultaten_instance_count: function(callback) {
            Resultaten.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Badminton Club Oostakker', error: err, data: results });
    });
};
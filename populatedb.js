#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Login = require('./model/login')
var Bestuur = require('./model/bestuur')
var Resultaat = require('./model/resultaten')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var bestuursleden = []
var resultaten = []


function loginCreate(username, pass, cb){
	logindetail = {username: username, pass: pass}
	var login  = new Login(logindetail);
	
	login.save(function (err){
		if(err){
			cb(err,null)
			return
		}
		console.log('root user made');
		cb(null, login)
	} );		
}

function bestuurCreate(first_name, family_name, gsmnummer, mail, functie, cb) {
  bestuurdetail = {first_name:first_name , family_name: family_name, gsmnummer: gsmnummer, mail: mail, functie: functie}
  
  
  var bestuur = new Bestuur(bestuurdetail);
       
  bestuur.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Bestuurslid: ' + bestuur);
    bestuursleden.push(bestuur)
    cb(null, bestuur)
  }  );
}

function resultatenCreate(Team1, Team2, ScoreT1, ScoreT2,Maker, Opm,  cb) {
	
  resultaatdetail = {Team1:Team1 , Team2: Team2, ScoreT1: ScoreT1, ScoreT2: ScoreT2 ,Maker:Maker, Opm: Opm}
  
  
  var resultaat = new Resultaat(resultaatdetail);
       
  resultaat.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Results: ' + resultaat);
    resultaten.push(resultaat)
    cb(null, resultaat)
  }  );
}



function createResultaten(cb){
	async.series([
		function(callback){
			resultatenCreate('Jan en Peter' , 'Bert en Koen', 21, 13, 'Jan', 'Zwaar gevochten om de laatste punten', callback);
		},
		],
		cb);
}


function createBestuursleden(cb) {
    async.series([
        function(callback) {
          bestuurCreate('Stefaan', 'Vandooren', '+32458300482', 'bestuur.bco@gmail.com', 'Voorzitter', callback);
        },
        function(callback) {
          bestuurCreate('Christoff', 'Peters', '+32457299475', 'christoff.petrs@gmail.com', 'Penningmeester', callback);
        },
        
        
        ],
        // optional callback
        cb);
}

function createRootUser(cb){
	async.series([
		function(callback){
			loginCreate('root', 'roottoor');
		},
		],
		cb);
}





async.series([
	createResultaten,
    createBestuursleden,
	createRootUser,
	
	 
    
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    
    // All done, disconnect from database
    mongoose.connection.close();
});





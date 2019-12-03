var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Resschema = new Schema(
  {
    Team1: {type: String, required: true, max: 100},
    Team2: {type: String, required: true, max: 100},
	ScoreT1: {type: Number, required: true},
	ScoreT2: {type:Number, required: true},
	Maker: {type: String, required: true},
	Opm : {type : String, required:false},
  }
);



Resschema
.virtual('Resultaat')
.get(function () {
  return this.ScoreT1 +' - '+this.ScoreT2;
});

Resschema
.virtual('Teams')
.get(function() {
	return this.Team1 + ' tegen ' + this.Team2;
});	

Resschema
.virtual('AltScore')
.get(function() {
	return this.Team1 + ' : ' + this.ScoreT1 + ' - ' + this.ScoreT2 + ' : ' + this.Team2;
});

Resschema
.virtual('Opme')
.get(function() {
	return this.Opm;
});



// Virtual for login's URL
Resschema
.virtual('url')
.get(function () {
  return '/resultaten/' + this._id;
});

Resschema
.virtual('deleteUrl')
.get(function () {
  return '/resultaten/' + this._id + '/delete';
});

//Export model
module.exports = mongoose.model('Resultaten', Resschema);
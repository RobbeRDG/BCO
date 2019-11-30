var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Bestuurschema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    gsmnummer: {type: String, required: true, max:17},
    mail: {type: String, required: true},
	functie: {type: String, required:true},
  }
);


//aanmaken van het eerste bestuurslid nl de voorzitter


// Virtual for bestuur's full name
Bestuurschema
.virtual('beschrijving')
.get(function () {
  return 'Onze ' + this.functie + ': '+this.family_name + ', ' + this.first_name;
});

Bestuurschema
.virtual('mailtje')
.get(function () {
  return this.mail;
});

// Virtual for bestuur's URL
Bestuurschema
.virtual('url')
.get(function () {
  return '/about/bestuur/' + this._id;
});


//Export model
module.exports = mongoose.model('Bestuur', Bestuurschema);

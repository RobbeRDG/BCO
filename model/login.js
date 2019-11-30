var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Logschema = new Schema(
  {
    username: {type: String, required: true, max: 100},
    pass: {type: String, required: true, max: 100, min: 8},
  }
);






// Virtual for login's URL
Logschema
.virtual('url')
.get(function () {
  return '/login/' + this._id;
});

//Export model
module.exports = mongoose.model('Login', Logschema);
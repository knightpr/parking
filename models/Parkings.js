//Parkings
var mongoose = require('mongoose');

var Parkingschema = new mongoose.Schema({
  garage: String,
  blocking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vechile' }],
  blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vechile' }],
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Parking', Parkingschema);
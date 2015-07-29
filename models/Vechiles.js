//Vechiles
var mongoose = require('mongoose');

var VechileSchema = new mongoose.Schema({
  model_name: String,
  plate_no: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  parking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parking' }]
});

module.exports = mongoose.model('Vechile', VechileSchema);
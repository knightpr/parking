var express = require('express');
var router = express.Router();
var User = require('../models/Users.js');
var Vechile = require('../models/Vechiles.js');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.param('id', function(req, res, next, id) {
  var query = Vechile.findById(id);
  query.exec(function (err, vechile){
    if (err) { return next(err); }
    if (!vechile) { return next(new Error('can\'t find post')); }
    req.vechile = vechile;
    return next();
  });
});

/* GET vechiles listing. */
router.get('/', function(req, res, next) {
  Vechile.find(function(err, vechile){
    if(err){ return next(err); }
	 res.json(vechile);
  });
});

/* GET /vechiles/id */
router.get('/:id', function(req, res, next) {
  req.vechile.populate('vechiles', function(err, vechile) {
    if (err) { return next(err); }
    res.json(vechile);
  });
});

/* PUT /vechiles/:id */
router.put('/:id',function(req, res, next) {
  Vechile.findByIdAndUpdate(req.params.id, req.body, function (err, vechile) {
    if (err) return next(err);
    res.json(vechile);
  });
});

/* DELETE /vechiles/:id */
router.delete('/:id',function(req, res, next) {
  Vechile.findByIdAndRemove(req.params.id, req.body, function (err, vechile) {
    if (err) return next(err);
    res.json(vechile);
  });
});

module.exports = router;

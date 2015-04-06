var express = require('express');
var router = express.Router();
var User = require('../models/Users.js');
var Vechile = require('../models/Vechiles.js');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.param('id', function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find post')); }
    req.user = user;
    return next();
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
   User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

/* GET /users/id */
router.get('/:id', function(req, res, next) {
  req.user.populate('vechiles', function(err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
});

/* PUT /users/:id */
router.put('/:id',function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* POST /users/:id/vechiles */
router.post('/:id/vechiles',function(req, res, next) {
  var vechile = new Vechile(req.body);
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    	vechile.user = user;
    	vechile.save(function(err, vechile){
		    if(err){ return next(err); }
		    user.vechiles.push(vechile);
		    user.save(function(err, user) {
		      if(err){ return next(err); }
		      res.json(vechile);
	    });
  });
  });

});

module.exports = router;

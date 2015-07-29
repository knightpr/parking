var express = require('express');
var router = express.Router();
var User = require('../models/Users.js');
var Vechile = require('../models/Vechiles.js');
var Parking = require('../models/Parkings.js');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


/* GET parking listing. */
router.get('/', function(req, res, next) {
  //  Parking.populate('blocked',function(err, parkings){
  //   if(err){ return next(err); }

  //   res.json(parkings);
  // });
Parking
.find()
.populate('blocked')
.populate('blocking')
.exec(function (err, parkings) {
  if (err) return handleError(err);
 
  res.json(parkings);
  // prints "The creator is Aaron"
})
});


/* POST parking listing. */

router.post('/',function(req, res, next) {
  console.log("Going to park" );

  var parking = new Parking();
  Vechile.findById( req.body.parked, function (err, parked_vechile) {
    if (err) return next(err);
    if (!parked_vechile) { return next(new Error('can\'t find parked vechile')); }

      // now finding blocked vechile

      Vechile.findById( req.body.blocked, function (err, blocked_vechile) {
        if (err) return next(err);
        if (!parked_vechile) { return next(new Error('can\'t find blocked vechile')); }
          parking.blocking = parked_vechile;
          parking.blocked = blocked_vechile;
          parking.garage = req.body.garage;

          parking.save(function(err, data){

            if(err){ return next(err); }
          
              res.json(data);
          });

      


      });
      //end

  });

});

router.post('/:parked/:blocked/:garage',function(req, res, next) {
  console.log("Going to park" );

  var parking = new Parking();
  Vechile.findById( req.params.parked, function (err, parked_vechile) {
    if (err) return next(err);
    if (!parked_vechile) { return next(new Error('can\'t find parked vechile')); }


      // now finding blocked vechile

      Vechile.findById( req.params.blocked, function (err, blocked_vechile) {
        if (err) return next(err);
        if (!parked_vechile) { return next(new Error('can\'t find blocked vechile')); }
          parking.blocking = parked_vechile;
          parking.blocked = blocked_vechile;
          parking.garage = req.params.garage;

          parking.save(function(err, data){

            if(err){ return next(err); }
          
              res.json(data);
          });

      


      });
      //end

  });

});


/* DELETE /parkings/:id */

router.delete('/:id',function(req, res, next) {
  Parking.findByIdAndRemove(req.params.id, req.body, function (err, parking) {
    if (err) return next(err);
    res.json(parking);
  });
});

module.exports = router;

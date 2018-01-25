var express = require('express');
var router = express.Router();

var ctrHotels = require('../controllers/hotels.controllers.js');

router
 .route('/hotels')
 .get(ctrHotels.hotelGetAll);

router
 .route('/hotels/:hotelId')
 .get(ctrHotels.hotelGetOne);

router
 .route('/hotels/new')
 .post(ctrHotels.hotelAddOne);

module.exports = router;
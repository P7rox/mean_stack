var express = require('express');
var router = express.Router();

var ctrHotels = require('../controllers/hotels.controllers.js');
var ctrReviews = require('../controllers/reviews.controllers.js');

router
 .route('/hotels')
 .get(ctrHotels.hotelGetAll)
  .post(ctrHotels.hotelAddOne);

router
 .route('/hotels/:hotelId')
 .get(ctrHotels.hotelGetOne)
 .put(ctrHotels.hotelUpdateOne)
 .delete(ctrHotels.hotelDeleteOne);

//Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrReviews.reviewsGetAll)
  .post(ctrReviews.reviewAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrReviews.reviewsGetOne)
  .put(ctrReviews.reviewsUpdateOne)
  .delete(ctrReviews.reviewsDeleteOne);

module.exports = router;
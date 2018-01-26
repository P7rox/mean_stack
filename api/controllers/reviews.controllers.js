var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel')

//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log("GET HotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc.reviews);
  });
};

//GET one reviews for a hotel
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for HotelId" + hotelId);
    
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
  });
};

var _addReview = function(req, res, hotel) {
  hotel.reviews.push({
      name : req.body.name,
      rating : parseInt(req.body.rating, 10),
      review : req.body.review
  });
    
  hotel.save(function(err, hotelUpdated) {
      if (err) {
          res
            .status(500)
            .json(err);
      } else {
          res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
      }
  });   
};

module.exports.reviewAddOne = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log("GET HotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
          status : 200,
          message : []
      };
      if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
      } else if (!doc) {
          console.log("hotel id bot found in database", id);
          response.status = 404;
          response.message = {
              "message" : "Hotel Id not found " + id
          }
      } 
      if (doc) {
          _addReview(req, res, doc);
      } else {
          res
            .status(response.status)
            .json(response.message);       
      }
  });
};

var _updateReview = function(req, res, review, doc) {

  review.name = req.body.name;
  review.rating = parseInt(req.body.rating, 10);
  review.review = req.body.review;
   
  doc.save(function(err, hotelUpdated) {
      if (err) {
          res
            .status(500)
            .json(err);
      } else {
          res
            .status(204)
            .json();
      }
  });   
};

module.exports.reviewsUpdateOne = function (req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET HotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
          status : 200,
          message : []
      };
      if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
      } else if (!doc) {
          console.log("hotel id bot found in database", hotelId);
          response.status = 404;
          response.message = {
              "message" : "Hotel Id not found " + hotelId
          }
      } 
      if (doc) {
          var review = doc.reviews.id(reviewId);
          _updateReview(req, res, review, doc);
      } else {
          res
            .status(response.status)
            .json(response.message);       
      }
  });
};

var _deleteReview = function(req, res, doc) {
   
  doc.save(function(err, hotelUpdated) {
      if (err) {
          res
            .status(500)
            .json(err);
      } else {
          res
            .status(204)
            .json();
      }
  });   
};

module.exports.reviewsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET HotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
          status : 200,
          message : []
      };
      if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
      } else if (!doc) {
          console.log("hotel id bot found in database", hotelId);
          response.status = 404;
          response.message = {
              "message" : "Hotel Id not found " + hotelId
          }
      } 
      if (!doc.reviews.id(reviewId)) {
          console.log("review id bot found in database", reviewId);
          response.status = 404;
          response.message = {
              "message" : "Review Id not found " + reviewId
          }
      } else {
          var review = doc.reviews.id(reviewId).remove();
          _deleteReview(req, res, doc); 
      }
    res
        .status(response.status)
        .json(response.message);       
  });
};
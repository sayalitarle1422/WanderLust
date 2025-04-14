const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync= require('../utlis/wrapAsync.js');
const {listingSchema , reviewSchema}= require("../schema.js");
const Review=require('../models/reviews.js');
const Listing=require('../models/listing.js');
const {validateReview, isLoggedin, isReviewAuthor}= require("../middleware.js");

const reviewController=require("../controllers/reviews.js");



//Reviews 
//post route
router.post("/", isLoggedin, validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview))


module.exports = router;
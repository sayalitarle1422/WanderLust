const Listing = require("./models/listing");
// const ExpressError = require("./utlis/ExpressError.js")\
const Review = require("./models/reviews");
const {listingSchema , reviewSchema}= require("./schema.js");

module.exports.isLoggedin = (req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing = (req,res,next) =>{
    let { error } = listingSchema.validate(req.body);
    try{
        if (error) {
        let errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
   }catch(error){
    next(error);
   }
};

module.exports.validateReview = (req,res,next) =>{
    let { error } = reviewSchema.validate(req.body);
    try{
        if (error) {
            let errMsg = err.details.map((el) => el.message).join(",");
            throw new ExpressError(400, errMsg);
        }else{
            next();
        }
}catch(error){
    next(error);
}

};

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not Author of this Review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
const express=require("express");
const app=express();
const initData=require("../init/data.js");
const wrapAsync= require('../utlis/wrapAsync.js');
const router=express.Router();
const Listing=require('../models/listing.js');
const {isLoggedin, isOwner, validateListing}=require("../middleware.js");

const ListingController = require("../controllers/listings.js");
const multer= require("multer");
const {storage}= require("../cloudConfig.js");
const upload= multer({ storage });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

router.route("/").get(wrapAsync(ListingController.index))
.post(isLoggedin,upload.single("listing[image]"), validateListing,
wrapAsync(ListingController.createListing));


//New route
router.get("/new",isLoggedin, ListingController.renderNewForm);

router.route("/:id").get(wrapAsync(ListingController.showListing))
.put(isLoggedin, isOwner, upload.single("listing[image]"),validateListing, wrapAsync( ListingController.updateListing))
.delete(isLoggedin,isOwner, wrapAsync(ListingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedin, isOwner,wrapAsync(ListingController.EditForm));

module.exports=router;
const express=require("express");
const router=express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");

const UserController= require("../controllers/users.js");

router.route("/signup").get(UserController.renderSignupForm)
.post(wrapAsync(UserController.signup));

router.route("/login").get(UserController.renderLoginForm).post(saveredirectUrl, 
    passport.authenticate("local", { failureRedirect: '/login', 
        failureFlash: true}),
    UserController.login);



router.get("/logout", UserController.logout );

module.exports = router;
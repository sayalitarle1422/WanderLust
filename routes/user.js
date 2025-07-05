const express=require("express");
const router=express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");

const UserController= require("../controllers/users.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",async (req,res)=>{
    let { username, email,password}= req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success","welcome to Wandurlust");
    res.redirect("/listings");

})
// router.route("/signup").get(UserController.renderSignupForm)
// .post(wrapAsync(UserController.signup));


// router.route("/login").get(UserController.renderLoginForm).post(saveredirectUrl, 
//     passport.authenticate("local", { failureRedirect: '/login', 
//         failureFlash: true}),
//     UserController.login);



// router.get("/logout", UserController.logout );

module.exports = router;
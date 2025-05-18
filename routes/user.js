const express=require("express");
const router=express.Router({mergeParams:true});

const wrapasynsc = require("../utils/wrapasynsc.js");
const passport = require("passport");
const { saveredirect } = require("../middleware.js");
const usercontroller=require("../controller/user.js");
router.get("/signup",usercontroller.rendersignup)
router.post("/signup",wrapasynsc(usercontroller.singnup));
router.get("/login",usercontroller.renderlogin);
router.post("/login",saveredirect,passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true}),
    usercontroller.logIn);
router.get("/logout",usercontroller.logout);
module.exports=router;
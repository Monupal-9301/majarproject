const express=require("express");
const router=express.Router({mergeParams:true});
const methodOverride = require('method-override');
router.use(methodOverride('_method'))
const wrapasynsc=require("../utils/wrapasynsc.js")
const path=require("path");
const {isowner,validatereview, islogin,isauther}=require("../middleware.js");
const reviewcontroller=require("../controller/review.js");
router.use(express.urlencoded({extended:true}));
router.use(express.static(path.join(__dirname,"/public")));
router.post("/",islogin,validatereview,wrapasynsc(reviewcontroller.newreview));
router.delete("/:review_id",islogin,isauther,wrapasynsc(reviewcontroller.destroyreview))
module.exports=router;

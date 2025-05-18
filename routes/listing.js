const express=require("express");
const router=express.Router();

const methodOverride = require('method-override');
router.use(methodOverride('_method'))
const wrapAsynsc=require("../utils/wrapasynsc.js");
const path=require("path");
router.use(express.urlencoded({extended:true}));
router.use(express.static(path.join(__dirname,"/public")));
const {islogin,isowner,validationerror}= require("../middleware.js");
const listingcontroller=require("../controller/listing.js");
//cloudinary---->
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage})
router.route("/")
.get( wrapAsynsc(listingcontroller.alllisting))
.post(upload.single("listing[image]"),validationerror,wrapAsynsc(listingcontroller.newlisting));
// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// })
router.get("/new",islogin,wrapAsynsc(listingcontroller.getlisting));
router.route("/:id")
.get(wrapAsynsc(listingcontroller.showlisting))
.patch(islogin,isowner,upload.single("listing[image]"),validationerror,wrapAsynsc(listingcontroller.updatelisting));
router.get("/:id/edit",islogin,isowner,wrapAsynsc(listingcontroller.editlisting));

router.delete("/:id/delete",islogin,isowner,wrapAsynsc(listingcontroller.destroylisting));
module.exports=router;

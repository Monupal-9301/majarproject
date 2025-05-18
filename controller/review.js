const listing=require("../models/listing")
const review=require("../models/review.js");
module.exports.newreview=async(req,res,next)=>{
   
  
   
    let {id}=req.params;

    
    let listing1= await listing.findById(id);
    
    
    let newreview=new review(req.body.review);
    newreview.auther=req.user._id;
    listing1.reviews.push(newreview);
    console.log(newreview);
    await newreview.save();
    await listing1.save();
    req.flash("review","new review created!");
    res.redirect(`/listing/${id}`)
   }
   module.exports.destroyreview=async(req,res)=>{
    let{id,review_id}=req.params;
    
    
    await listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
    req.flash("review","One Review deleted!");
    await review.findByIdAndDelete(review_id);
    res.redirect(`/listing/${id}`);
};
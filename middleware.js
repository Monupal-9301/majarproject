const listing = require("./models/listing.js");
const schema=require("./schema.js");
const expressError=require("./utils/expressError.js");
const schema2=require("./schema2.js");
const review=require("./models/review.js");
module.exports.islogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        
       return res.redirect("/login");
       
    }
    next();
}

module.exports.saveredirect=(req,res,next)=>{
    if (req.session.redirectUrl) {
        res.locals.redirecturl=req.session.redirectUrl;
        
        
    } 
    next();
}
module.exports.isowner=async(req,res,next)=>{
    let{id}=req.params;
    console.log(id);
    
    let Listing= await listing.findById(id);
    
    
    if(!Listing.owner.equals(res.locals.user._id)){
        req.flash("error","You are not the user of this listing !");
       return res.redirect(`/listing/${id}`);
    }
    next();
      
}

module.exports.validationerror=(req,res,next)=>{
    
    
    let {error}= schema.validate(req.body);
    if(error){
     let errmsg=error.details.map((el)=>el.message).join(",");
     throw new expressError(400,errmsg); 
     
    }
    else{
     next();
 
    }
 
 }
 module.exports.validatereview=(req,res,next)=>{
    let {error}= schema2.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=> el.message).join(",");
        throw new expressError(400,errmsg);
    }
    else{
        next();
    }

}
module.exports.isauther=async(req,res,next)=>{
    let{id,review_id}=req.params;
    let review1= await review.findById(review_id);
    console.log(review1);
    if(!review1.auther.equals(res.locals.user._id)){
        req.flash("error","Not allowed");
       return res.redirect(`/listing/${id}`);
    }
    next();
}




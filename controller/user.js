const User=require("../models/user.js");
module.exports.rendersignup=async(req,res,next)=>{
    res.render("users/signup.ejs")
};
module.exports.singnup=async(req,res,next)=>{
    try{
        let{email,username,password}=req.body;
    let newuser=new User({email,username})
    let registeruser=await User.register(newuser,password);
    //req.flash("success","register successfully!")
    req.logIn(registeruser,(err)=>{
        if (err) {
            return next(err);
            
        }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listing");
        
            
    })
    
   
   }
   catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
    
}
module.exports.renderlogin=(req,res,next)=>{
    res.render("users/login.ejs");
};
module.exports.logIn=async(req,res)=>{
        if (res.locals.redirecturl) {
            res.redirect(res.locals.redirecturl);
        }
        else{
            res.redirect("/listing")
        }
};
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if (err) {
            return next(err);
            
        }
        req.flash("success","logged you out");
        res.redirect("/listing");
        
    })
    
}
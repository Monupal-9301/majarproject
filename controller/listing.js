

const listing=require("../models/listing");
module.exports.alllisting=async(req,res)=>{
    let data= await listing.find();
    res.render("listing/index.ejs",{data});
};
module.exports.getlisting=async(req,res)=>{
    res.render("listing/new.ejs");
}
module.exports.newlisting=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    
    const addlisting=new  listing(req.body.listing);
     addlisting.owner=req.user._id;
     addlisting.image={url,filename};
      await addlisting.save();
      req.flash("success","new listing created!");
      res.redirect("/listing")
};
module.exports.showlisting=async(req,res)=>{
    let{id}=req.params;
    const data2=await listing.findById(id).populate({path:"reviews",populate:{path:"auther"}}).populate("owner");
    if (!data2) {
        req.flash("error","listing you requested does not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs",{data2});
};
module.exports.editlisting=async(req,res)=>{
    let{id}=req.params;
     const data= await listing.findById(id);
     
     
     if (!data) {
        req.flash("error","listing you requested does not exist!");
        return res.redirect("/listing");
    }
    let newurl=data.image.url.replace("/upload","/upload/w_250");
    console.log(newurl);
    
    res.render("listing/edit.ejs",{data,newurl})
};
module.exports.updatelisting=async(req,res)=>{
    let{id}=req.params;
    if(req.file){
     let url=req.file.path;
    let filename=req.file.filename;
    
    await listing.findByIdAndUpdate(id,{ ...req.body.listing,image:{url,filename} });
    }
    else{
        await listing.findByIdAndUpdate(id,{...req.body.listing});
    }
    req.flash("success","Edit successfully!")
    res.redirect(`/listing/${id}`);
};
module.exports.destroylisting=async(req,res)=>{
    req.flash("success","delete sucessfully");
    let{id}=req.params;
     await listing.findByIdAndDelete(id);
     res.redirect("/listing")
};

if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
    
}


const express=require("express");
const app=express();
let port=8080;
const mongoose=require("mongoose");
const methodOverride = require('method-override');
const expressError=require("./utils/expressError.js")
const session = require('express-session');
const MongoStore=require("connect-mongo");
const flash = require('connect-flash');
const passport=require("passport");
const Localstrategy=require("passport-local");
const User=require("./models/user.js");
const ejsmate=require("ejs-mate");
const cookie_parser=require("cookie-parser")

app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.engine("ejs",ejsmate);

app.use(cookie_parser("secretecode"));







const path=require("path");


app.set("view engine","ejs");
app.engine("ejs",ejsmate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

const listingdata=require("./routes/listing.js");
const reviewrouter=require("./routes/reviewroute.js");
const userrouter=require("./routes/user.js");

const Atlus_db=process.env.ATLASDB_URL;
// const Atlus_db='mongodb://127.0.0.1:27017/wanderlust';


main().then(()=>{
    console.log("mongoose connected");
    
})
.catch((error)=>{
    console.log(error);
    
})
async function main(){
    try{
        console.log("Connecting to MongoDB...");
        await mongoose.connect(Atlus_db);
        console.log("Mongoose connected");
    } catch (err) {
        console.error("MongoDB connection failed:");
        console.error(err);
    }
    
}
const store=MongoStore.create({
    mongoUrl:Atlus_db,
    crypto:{
        secret:process.env.SECRET,

    },
    touchAfter:24*3600
})


const sessionoption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*60*60*1000,
        maxAge:7*60*60*1000,
        httpOnly:true

    }
}
store.on("error",(err)=>{
    console.log("error in mongodb session",err);
    
})




// app.get("/home",(req,res)=>{
//     res.send("send some cookies!")
// });
app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    
    
    res.locals.success=req.flash("success");
    res.locals.review=req.flash("review");
    res.locals.error=req.flash("error");
    res.locals.user=req.user;
    
    
    
    
    next();
})
app.use("/listing",listingdata);

app.use("/listing/:id/reviews",reviewrouter);
app.use("/",userrouter);
app.all(/.*/,(req,res,next)=>{
    next(new expressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let{statuscode=500,message="some error"}=err;
    
    
    res.status(statuscode).render("./listing/err", {message});
    
    // res.status(statuscode).send(message);
    next()
    
});
app.listen(port,()=>{
    console.log(`listing on port ${port}`)
    
});

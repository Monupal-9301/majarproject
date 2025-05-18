const mongoose=require("mongoose");

const review= require("./review.js");

const { type } = require("../schema.js");
const Schema=mongoose.Schema;
const listingschema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        
        url:String,
        filename:String
        
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    }
    
})
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
      await review.deleteMany({_id:{$in:listing.reviews}})
    }

    
})
const listing=mongoose.model("listing",listingschema);
module.exports=listing;
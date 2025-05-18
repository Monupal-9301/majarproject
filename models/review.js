const mongoose=require("mongoose");
const { type } = require("../schema");

const Schema=mongoose.Schema;

const reviewschema=new Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    auther:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
})
const review=mongoose.model("review",reviewschema);
module.exports=review;
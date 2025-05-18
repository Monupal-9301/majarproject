const mongoose=require("mongoose");
const listing=require("../models/listing.js");
const initdata=require("./data.js");
main().then(()=>{
    console.log("mongoose connected");
    
})
.catch((error)=>{
    console.log(error);
    
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')

}
const initdb= async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj, owner:'680bbbab7cabddc764907bdc'}))
    await listing.insertMany(initdata.data);
    console.log("data insert sucessfully");
    

}
initdb();
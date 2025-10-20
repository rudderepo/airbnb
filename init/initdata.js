const mongoose = require('mongoose');
const sampledata=require("./sampledata.js");
const listing=require("../model/listing.js");
const user=require("../model/user.js");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb')
}
main().then(()=>{
    console.log("airbnb database connected");
})
.catch((err)=>{
    console.log(err);
})
async function init() {
    await listing.deleteMany({});
    sampledata.data=sampledata.data.map((obj)=>({...obj,owner:"68f478a719b0568347f41666"}));
    await listing.insertMany(sampledata.data);
    console.log("saved all data");
}
init();
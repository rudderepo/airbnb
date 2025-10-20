const { required } = require("joi");
const mongoose=require("mongoose");
const {user}=require("./user.js");
const reviewschema=new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    comment:String,
    createdAt:{
        type:Date,
        default:Date.now(),
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
})
module.exports=mongoose.model("reviews",reviewschema);
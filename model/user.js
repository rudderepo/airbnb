const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
})
userschema.plugin(passportlocalmongoose);
module.exports=mongoose.model("user",userschema);
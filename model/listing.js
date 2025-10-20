const mongoose=require("mongoose");
const { reviewschema } = require("../schema");
const schema=mongoose.Schema;
const reviews=require("./review")
const user=require("./user");
const { string } = require("joi");
const listingschema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
})

listingschema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await reviews.deleteMany({ _id: { $in: doc.review } });
    }
});

const listing=mongoose.model("listing",listingschema);
module.exports=listing;
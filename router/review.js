const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapasync = require("../util/ultilities.js")
const expresserror = require("../util/expresserror.js");
const reviews = require("../model/review.js");
const listing = require("../model/listing.js");
const { listschema,reviewschema} = require("../schema.js");
const {loggedin,isowner,isauthor}=require("../middleware.js")
const reviewcontroller=require("../controller/review.js")
const validity2 = (req, res, next)=>{
    let { error } = reviewschema.validate(req.body);
    
    if (error) {
        let errmessage=error.details.map((element)=>element.message).join(",");
        throw new expresserror(400, errmessage);
    }
    else {
        next();
    }
}
router.post("/add",validity2,loggedin,wrapasync(reviewcontroller.addreview));
router.delete("/:reviewid",loggedin,isauthor,wrapasync(reviewcontroller.deletereview));
module.exports=router;





















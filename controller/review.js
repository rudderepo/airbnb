let listing=require("../model/listing")
let reviews=require("../model/review")
module.exports.addreview=async(req,res)=>{
    console.log(req.params.id);
    let result=await listing.findOne({_id:req.params.id});
    const review1=new reviews(req.body.review);
    review1.author=req.user._id; 
    result.review.push(review1);
    await result.save();
    await review1.save();
    console.log(result);
    req.flash("success","Review Listed");
    res.redirect(`/listing/${req.params.id}`);
}
module.exports.deletereview=async(req,res)=>{
    let{id,reviewid}=req.params;
    await reviews.findByIdAndDelete(reviewid);
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewid}});
    req.flash("success","Review Deleted");
    res.redirect(`/listing/${id}`);
}
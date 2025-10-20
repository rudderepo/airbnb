const listing=require("./model/listing.js");
const review=require("./model/review.js");
module.exports.loggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnto=req.originalUrl;
        req.flash("error","You Have To Be Logged In Firstly");
        return res.redirect("/login");
    }
    next();
}  
module.exports.url=(req,res,next)=>{
    req.session.returnto=req.originalUrl;
    next();
}
module.exports.isowner=async(req,res,next)=>{
    let { id } = req.params;
    let list = await listing.findById(id);
    if(!res.locals.curruser._id.equals(list.owner._id)){
        req.flash("error","you are not the owner");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
module.exports.isauthor=async(req,res,next)=>{
    let {id,reviewid} = req.params;
    console.log(reviewid);
    let list = await review.findById(reviewid);
    console.log(list);
    if(!res.locals.curruser._id.equals(list.author)){
        req.flash("error","you are not the owner");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
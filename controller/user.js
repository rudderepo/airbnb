const user=require("../model/user.js");

module.exports.postsignup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        console.log(username);
        const user1 = new user({ email, username });
        const newuser = await user.register(user1, password);
        req.login(newuser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "user registered succesfully");
            res.redirect("/listing");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}
module.exports.getsignup=(req, res) => {
    res.render("users/signup.ejs");
}
module.exports.getlogin= (req, res) => {
    res.render("users/login.ejs");
}
module.exports.postlogin=async (req, res) => {
    req.flash("success","user logged in");
    let redirecting=req.session.returnto||"/listing";
    res.redirect(redirecting);

}
module.exports.getlogout=(req,res)=>{
    console.log(req.user);
    if(!req.user){
        req.flash("error","You are not Logged In");
        return res.redirect("/listing");
    }
    req.logOut((err)=>{
        if(err){return next(err);}
        req.flash("success","successfully logged out");
        res.redirect("/listing");
    })
    
   
}
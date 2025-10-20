const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require("../model/user.js")
const wrapAsync = require("../util/ultilities.js")
const passport = require("passport");
const { url } = require("../middleware.js");
const controlleruser = require("../controller/user.js");
router.route("/signup")
    .get(controlleruser.getsignup)
    .post(wrapAsync(controlleruser.postsignup))
router.route("/login")
    .get(controlleruser.getlogin)
    .post(url, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), wrapAsync(controlleruser.postlogin));
router.get("/logout", controlleruser.getlogout)
module.exports = router;
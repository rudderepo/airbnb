if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const db_url = process.env.ATLASDB_URL;
console.log("DB URL:", db_url);
const path = require("path");
app.set("view engine", "ejs");
const ejsmate = require("ejs-mate");
const session = require("express-session")
const MongoStore = require('connect-mongo');
app.engine("ejs", ejsmate);
const expresserror = require("./util/expresserror.js");
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "views"));
const mongoose = require('mongoose');
var methodOverride = require('method-override');
app.use(methodOverride("_method"));
const flash = require("connect-flash");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const passport = require("passport");
const localstrategy = require("passport-local");
const user = require("./model/user.js");
const { func } = require('joi');
let secretcode=process.env.SECRET_CODE;
const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: secretcode,
    },    
    touchAfter: 24 * 3600,
})
store.on("error",()=>{
    console.log("error in mongo session");
})
const sessionoptions = {
    store,
    secret: secretcode,
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionoptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.listen(8080, () => {
    console.log("server is listenting to port 8080");
})
async function main() {
    await mongoose.connect(db_url)
}
main().then(() => {
    console.log("airbnb database connected");
})
    .catch((err) => {
        console.log(err);
    })
const listing = require("./router/listing.js");
const userrouter = require("./router/user.js");
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
})

app.use("/", userrouter);
app.use("/listing", listing);
const review = require("./router/review.js");
app.use("/listing/:id/review", review);
app.all(/.*/, (req, res) => {
    throw new expresserror(404, "Page Not Found");
});
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong" } = err;
    res.status(status).render("listing/err.ejs", { status, message });
})
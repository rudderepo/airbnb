const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapasync = require("../util/ultilities.js")
const expresserror = require("../util/expresserror.js");
const listing = require("../model/listing.js");
const { loggedin } = require("../middleware.js");
const { listschema, reviewschema } = require("../schema.js");
const {isowner}=require("../middleware.js");
const listingcontroller=require("../controller/listing.js")
const {storage}=require("../cloudconfig.js");
const multer  = require('multer')
const upload = multer({ storage})
const validity = (req, res, next) => {
    let { error } = listschema.validate(req.body);

    if (error) {
        let errmessage = error.details.map((element) => element.message).join(",");
        throw new expresserror(400, errmessage);
    }
    else {3
        next();
    }
}
router.get("/", wrapasync(listingcontroller.index));
router.get("/new", loggedin, listingcontroller.rendernew);
router.post("/addnew",validity,  loggedin,upload.single('listing[image]'), wrapasync(listingcontroller.addnew));

router.get("/:id", wrapasync(listingcontroller.show));
router.get("/edit/:id", loggedin,isowner, wrapasync(listingcontroller.edit))
router.patch("/edited/:id", isowner,upload.single('listing[image]'),wrapasync(listingcontroller.editpatch))
router.delete("/delete/:id", loggedin, isowner,wrapasync(listingcontroller.deletelisting));
module.exports = router;




















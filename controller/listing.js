const listing = require("../model/listing.js");
module.exports.index = async (req, res) => {
    const allListings = await listing.find({});
    res.render("listing/index.ejs", { allListings });
}
module.exports.addnew = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const listingdata = req.body.listing;
    const listing2 = new listing(listingdata);
    listing2.owner = req.user._id;
    listing2.image = { url, filename };
    await listing2.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing");
}
module.exports.show = async (req, res) => {
    let { id } = req.params;
    let hotel = await listing.findById(id).populate({ path: "review", populate: { path: "author" }, }).populate("owner");
    if (!hotel) {
        req.flash("error", "Listing Not Existed");
        res.redirect("/listing");
    } else {
        res.render("listing/show.ejs", { hotel });
    }

}
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let hotel = await listing.findById(id);
    console.log(hotel);
    let originalphoto=hotel.image.url;

    originalphoto=originalphoto.replace("/upload","/upload/w_300,e_blur:150");

    if (!hotel) {
        req.flash("error", "Listing Not Existed");
        res.redirect("/listing");
    } else {
        res.render("listing/edit.ejs", { hotel ,originalphoto});
    }

}
module.exports.editpatch = async (req, res) => {

    let { id } = req.params;
    let list = await listing.findById(id);

    if (!res.locals.curruser._id.equals(list.owner._id)) {
        req.flash("error", "you are not the owner");
        return res.redirect(`/listing/${id}`);
    }
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = { url, filename };

        await list.save();
    }
    req.flash("success", "Listing Edited Successfully");
    res.redirect(`/listing/${id}`);
}
module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    await listing.findOneAndDelete({ _id: id });
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listing");
}
module.exports.rendernew = (req, res) => {
    res.render("listing/new.ejs");
}
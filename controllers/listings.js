const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req,res)=>{
  res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
      path:"author",
    },
  })
.populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
};

module.exports.createListing = async (req, res) => {
    const listingData = req.body.listing || {};

    // If user entered an image URL (text input), convert to object shape
    if (listingData.image && typeof listingData.image === "string") {
      listingData.image = {
        url: listingData.image,
        filename: "default",
      };
    } else if (!listingData.image) {
      // No image provided: set default image object
      listingData.image = {
        url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
        filename: "default",
      };
    }

    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
   
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async (req, res) => {

    const { id } = req.params;
    const listingData = req.body.listing || {};

    // If user provided image as a string, convert to object
    if (listingData.image && typeof listingData.image === "string") {
      listingData.image = {
        url: listingData.image,
        filename: "default",
      };
    } else {
      // If the edit form left image blank, we don't want to overwrite existing image with undefined.
      // So retrieve current listing and keep its image if not provided.
      if (!listingData.image) {
        const existing = await Listing.findById(id);
        if (existing && existing.image) {
          listingData.image = existing.image;
        } else {
          // fallback default if DB also has no image
          listingData.image = {
            url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
            filename: "default",
          };
        }
      }
    }


    await Listing.findByIdAndUpdate(id, listingData, { runValidators: true });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
 
};

module.exports.destroyListing = async(req,res)=>{
    let {id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
     req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};
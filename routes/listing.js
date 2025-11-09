const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema}= require("../Schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);

    if(error){
      let errmsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
    }else{
      next();
    }
}



// Index Route
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// new Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show Route
router.get("/:id",async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
});


//Create Route
// Create Route
router.post("/",validateListing, wrapAsync(async (req, res) => {
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
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
   
}));


//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//update Route
// Update Route
router.put("/:id",validateListing, wrapAsync(async (req, res) => {

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
 
}));


//Delete Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
     req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}));


module.exports = router;
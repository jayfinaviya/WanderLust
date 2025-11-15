const { ref } = require("joi");
const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description:{
    type: String,
    required: true,
  },
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
  },
});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await review.deleteMany({_id: {$in: listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

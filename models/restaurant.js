const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // username of restaurant owner
  name: { type: String, required: true, maxlength: 100 },
  cuisine: { type: String, required: true, maxlength: 100 },
  street: { type: String, required: true, maxlength: 100 },
  city: { type: String, required: true, maxlength: 100 },
  state: { type: String, required: true, maxlength: 100 },
  zip: { type: Number, required: true, maxlength: 20 },
  number: { type: String, required: true, maxlength: 20 },
  lat: { type: String, required: false, maxlength: 10 },
  lng: { type: String, required: false, maxlength: 10 }
});

// Virtual for restaurant's full address
RestaurantSchema.virtual("address").get(function () {
  return `${street} ${city}, ${state} ${zip}`;
});

// Virtual for restaurant's URL (matches Yelp's style)
// Example: https://www.yelp.com/biz/toshis-beaverton
RestaurantSchema.virtual("url").get(function () {
  var formattedURL = `/${name} ${city}`.toLowerCase();
  // RegEx from https://stackoverflow.com/questions/2657433/replace-space-with-dash-javascript/2657438
  return formattedURL.replace(/\s/g, "-");
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
  name: { type: String, maxlength: 100, required: true },
  description: { type: String, maxlength: 100 },
  price: { type: Number, required: true }, // cents
  // images?
});

// TODO format price

module.exports = mongoose.model("MenuItem", MenuItemSchema);

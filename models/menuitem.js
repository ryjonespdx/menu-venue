const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
  // menu it belongs on
  menu: { type: Schema.Types.ObjectId, ref: "Menu", required: true }, 
  category: { type: String, required: true },
  name: { type: String, maxlength: 100, required: true },
  description: { type: String, maxlength: 100 },
  price: { type: String, required: true }, // cents
  // images?
});

// TODO format price

module.exports = mongoose.model("MenuItem", MenuItemSchema);

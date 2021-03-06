const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// A list of items from a restaurant's menu
const ShareSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  menu: { 
    type: Schema.Types.ObjectId,
    ref: "Menu",
    required: true, 
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
    }
  ],
  date: { 
    type: Date, 
    default: Date.now }
});

module.exports = mongoose.model("Share", ShareSchema);

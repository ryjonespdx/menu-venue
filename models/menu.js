var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
  // the restaurant associated with the menu
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  // the items in the menu
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

module.exports = mongoose.model("Menu", MenuSchema);

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
  // the restaurant associated with the menu
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { 
    type: String, 
    required: true, 
    maxlength: 100 
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

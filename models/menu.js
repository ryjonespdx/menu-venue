const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
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
  }
});

module.exports = mongoose.model("Menu", MenuSchema);

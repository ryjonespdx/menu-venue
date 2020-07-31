var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  id: Number,
  email: String,
  password: String,
  url: String,
});

module.exports = mongoose.model("UserModel", UserModelSchema);

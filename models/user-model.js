var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  username: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100 },
});

module.exports = mongoose.model("UserModel", UserModelSchema);

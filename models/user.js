// Passport.js and auth from https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/
// Passport.js also from https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { JWT_SECRET } = require("../config/config");

const UserSchema = new Schema({
  local: {
    username: { type: String, unique: true, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 100 },
    hash: { type: String },
    salt: { type: String },
  },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: String, required: false },
});

UserSchema.methods.setPassword = function (password) {
  console.log(password[0]);
  console.log(typeof password[0]);
  this.local.salt = crypto.randomBytes(16).toString("hex");
  this.local.hash = crypto
    .pbkdf2Sync(password[0], this.local.salt, 128, 128, "sha512")
    .toString("hex");
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password[0], this.local.salt, 128, 128, "sha512")
    .toString("hex");
  return this.local.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    JWT_SECRET
  );
};

UserSchema.methods.toAuthJSON = function (token) {
  return {
    _id: this._id,
    username: this.local.username,
    token: token,
    email: this.email,
  };
};

module.exports = mongoose.model("User", UserSchema);

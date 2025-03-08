const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  dob: Date,
  location: String,
  gender: String,
  bio: String,
  profilePicture: String,
});

// Hash password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);

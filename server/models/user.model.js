const mongoose = require("mongoose");

/* Database Schema Define */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  image:String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const User = new mongoose.model("curdUser", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [2, `too few characters`],
    maxlength: [50, `too many characters`],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    minlength: [2, `too few characters`],
    maxlength: [50, `too many characters`],
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
    trim: true,
    maxlenght: [25, "name must be 25 ch length"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);

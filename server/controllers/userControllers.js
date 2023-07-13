// LOGIC , BL
const User = require("../models/userModel");

exports.home = (req, res) => {
  res.send("hello alpha batch");
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    // To check all the details
    if (!name || !email) {
      throw new Error("Name and Email are required ");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("Email already exists");
    }
    const user = await User.create({ name, email });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      throw new Error("No User matches with id");
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // const { email } = req.body;
    const userId = req.params.id;
    // const userExist = await User.findOne({ email });
    const userExist = await User.findByIdAndDelete(userId);
    if (!userExist) {
      throw new Error("No User found");
    }
    // deletedUser = await User.deleteOne({ email });
    res.status(201).json({
      success: true,
      message: "User deleted successfully",
      // deletedUser,
      userExist,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

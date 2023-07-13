require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectToDB = require("./config/db");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

connectToDB();

app.use("/", userRoutes);
// you should use app.use("/", userRoutes) to handle
//  all HTTP methods (GET, POST, etc.) for the root URL ("/")
// using the userRoutes middleware.

module.exports = app;

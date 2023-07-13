const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`Connected DB : ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectToDB;

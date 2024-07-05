const mongoose = require("mongoose");

/* Database Connection */
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/crudOperation");
    console.log("Database connection sucessfull");
  } catch (error) {
    console.log("Failed to connect with Database");
  }
};

module.exports = connectDb;

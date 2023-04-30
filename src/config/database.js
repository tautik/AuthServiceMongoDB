const mongoose = require("mongoose");
const { DB_URL } = require("./serverConfig");
const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log("Error while connecting " + error.message);
  }
};

module.exports = connect;

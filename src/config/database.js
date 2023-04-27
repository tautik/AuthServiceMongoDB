const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/AuthService");
};

module.exports = connect;

const dotenv = require("dotenv");

const config = dotenv.config();

module.exports = {
  PORT: process.env.PORT,
};

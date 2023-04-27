const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const config = dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(9),
};

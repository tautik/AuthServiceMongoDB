const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");

const userSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email required"],
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const encryptedPassword = await bcrypt.hashSync(this.password, SALT);
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      lowercase: true,
      unique: [true, "Email must be unique"],
      required: [true, "Email required"],
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("email must be unique"));
  } else {
    next(error);
  }
});

userSchema.pre("save", async function (next) {
  const encryptedPassword = await bcrypt.hashSync(this.password, SALT);
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const validator = require("validator");

const validateUserAuth = (req, res, next) => {
  //if no email or passsword given then through error
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Please enter correct email format",
    });
  }

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the request",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      data: {},
      err: "User id not given",
      message: "Something went wrong",
    });
  }
  next();
};
const validateEmail = (email) => {
  return validator.isEmail(email);
};
module.exports = {
  validateUserAuth,
  validateIsAdminRequest,
};

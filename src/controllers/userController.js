const { UserService } = require("../service/index");
const userService = new UserService();

const signUp = async (req, res) => {
  try {
    const response = await userService.create({
      name: req.body.name,
      userEmail: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user Controller",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(409).json({
      message: "Unable to create user ",
      data: {},
      success: false,
      err: error,
    });
  }
};
const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res
      .status(200)
      .cookie("token", response, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        success: true,
        data: {},
        err: {},
        message: "Successfully signed in",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to signIn user Controller layer",
      data: {},
      success: false,
      err: error.error,
    });
  }
};

const ValidateUser = async (req, res) => {
  console.log("Entered validation");
  try {
    const cookieHeader = req.headers.cookie;
    const cookieArray = cookieHeader.split("; ");
    const tokenCookie = cookieArray.find((cookie) =>
      cookie.startsWith("token=")
    );
    const token = tokenCookie.split("=")[1];

    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and token is valid",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate token",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  signIn,
  signUp,
  ValidateUser,
};

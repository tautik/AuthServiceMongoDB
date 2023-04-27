const { UserService } = require("../service/index");

class UserController {
  constructor() {
    this.UserService = new UserService();
  }

  async signUp(req, res) {
    try {
      const data = {
        userEmail: req.body.userEmail,
        password: req.body.password,
      };
      const user = await UserService.create(data);
      return res.status(201).json({
        success: true,
        message: "Successfully created a new user",
        data: response,
        err: {},
      });
    } catch (error) {
      console.log(error);
      // return res.status(500).json({
      //   message: "Unable to create user Controller layer",
      //   data: {},
      //   success: false,
      //   err: error,
      // });
    }
  }
  async signIn(req, res) {
    try {
      const data = {
        userEmail: req.body.userEmail,
        password: req.body.password,
      };
      const user = await UserService.signIn(data);
      return res.status(200).json({
        success: true,
        data: response,
        err: {},
        message: "Successfully signed in",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Unable to create user Controller layer",
        data: {},
        success: false,
        err: error,
      });
    }
  }
}

module.exports = UserController;

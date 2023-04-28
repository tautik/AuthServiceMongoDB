const express = require("express");

const UserController = require("../../controllers/userController");
const Validate = require("../../middlewares/auth-request-validator");
const router = express.Router();

router.post("/signup", Validate.validateUserAuth, UserController.signUp);
router.post("/signin", Validate.validateUserAuth, UserController.signIn);
module.exports = router;

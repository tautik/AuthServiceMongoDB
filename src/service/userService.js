const { UserRepository } = require("../repository/index");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        console.log("User not found");
        throw { error: "User not found" };
      }

      const passwordsMatch = await this.checkPassword(
        plainPassword,
        user.password
      );
      console.log(passwordsMatch);
      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }

      //password matched now create jwt token
      const token = this.createToken({ email: email, password: plainPassword });
      console.log(token);
      return token;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("error");
      console.log("Something went wrong in service create");
    }
  }

  async getById(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async checkPassword(givenPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(givenPassword, encryptedPassword);
    } catch (error) {
      console.log(error);
    }
  }

  async createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }
}

module.exports = UserService;

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
      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }

      //password matched now create jwt token
      const token = this.createToken({ email: email, password: plainPassword });
      return token;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  async create(data) {
    try {
      const duplicate = await this.userRepository.getByEmail(data.userEmail);
      if (duplicate) {
        console.log("Duplicate entry found");
        throw new Error("Duplicate entry found");
      }
      const user = await this.userRepository.create(data);
      // removing password coming in user data
      return user;
    } catch (error) {
      console.log("Something went wrong in service create");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, "hello");
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token son" };
      }
      const user = await this.userRepository.getByEmail(response.email);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.userEmail;
      // status -> {email:__,password:__,iat:__,exp:__}
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
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
      const result = await jwt.sign(user, "hello", { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
}

module.exports = UserService;

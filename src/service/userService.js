const { UserRepository } = require("../repository/index");
const bcrypt = require("bcrypt");
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
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  async create(data) {
    try {
      console.log(data);
      const user = await this.userRepository.create(data);
      if (user) {
        return user;
      } else {
        throw new Error("User was not created");
      }
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
}

module.exports = UserService;

const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async create(data) {
    try {
      console.log(data);
      const user = await this.UserRepository.create(data);
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
  async signIn(data) {
    try {
      const user = this.getByEmail(data.userEmail);
      const passwordsMatch = this.checkPassword(data.password, user.password);

      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await this.UserRepository.findOne({ userEmail: userEmail });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(userId) {
    try {
      const user = await this.UserRepository.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async checkPassword(givenPassword, storedPassowrd) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;

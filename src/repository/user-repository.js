const { User } = require("../model/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(userId) {
    try {
      const user = await User.findOneAndDelete(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ userEmail });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepository;

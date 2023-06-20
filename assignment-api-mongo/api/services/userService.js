// const User = require('../models/user');

// class UserService {
//   async createUser(userData) {
//     try {
//       const user = await User.create(userData);
//       return user;
//     } catch (error) {
//       throw new Error('Error creating user');
//     }
//   }

//   async updateUser(id, userData) {
//     try {
//       const user = await User.findByIdAndUpdate(id, userData, { new: true });
//       return user;
//     } catch (error) {
//       throw new Error('Error updating user');
//     }
//   }

//   async deleteUser(id) {
//     try {
//       const user = await User.findByIdAndDelete(id);
//       return user;
//     } catch (error) {
//       throw new Error('Error deleting user');
//     }
//   }
// }

// module.exports = UserService;
const User = require('../models/user');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(userId, updatedUserData) {
    const user = await User.findById(userId);
    Object.assign(user, updatedUserData);
    return await user.save();
  }
}

module.exports = UserService;
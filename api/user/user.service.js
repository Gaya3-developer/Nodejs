// user.service.js
const User = require('./user.model');

module.exports = {
  findUserByEmail: async function(email) {
    return User.findOne({ email });
  },
  createUser: async function(user) {
    return User.create(user);
  }
};
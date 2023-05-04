const bcrypt = require('bcrypt');
const userService = require('./user.service');

module.exports = {
  signup: async function(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = {
        name,
        email,
        password: hashedPassword
      };

      // Save the user to the database
      const savedUser = await userService.createUser(newUser);

      return res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
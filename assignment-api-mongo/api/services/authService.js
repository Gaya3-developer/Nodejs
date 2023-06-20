// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

// class AuthService {
//   async signIn(username, password) {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         throw new Error('Invalid credentials');
//       }

//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         throw new Error('Invalid credentials');
//       }

//       const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//         expiresIn: '1h', // Token expiration time
//       });

//       return token;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }

// module.exports = AuthService;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

class AuthService {
  
  async signIn(email, password, role) {
    try {
      // Find the user by username
      const user = await User.findOne({ email, role });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate a JWT token with the user ID and role
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AuthService;
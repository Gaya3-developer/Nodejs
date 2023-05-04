// const UserService = require('../services/UserService');

// const userService = new UserService();

// class UserController {
//   async createUser(req, res) {
//     try {
//       const userData = req.body;
//       const user = await userService.createUser(userData);
//       res.json(user);
//     } catch (error) {
//       console.error('Error creating user', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async updateUser(req, res) {
//     try {
//       const { id } = req.params;
//       const userData = req.body;
//       const updatedUser = await userService.updateUser(id, userData);
//       if (!updatedUser) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(updatedUser);
//     } catch (error) {
//       console.error('Error updating user', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async deleteUser(req, res) {
//     try {
//       const { id } = req.params;
//       const deletedUser = await userService.deleteUser(id);
//       if (!deletedUser) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting user', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }

// module.exports = UserController;


const UserService = require('../services/userService');
const User = require('../models/user');
const userService = new UserService();
const AuthService = require('../services/authService');
const authService = new AuthService();
class UserController {


  // async createUser(req, res) {
  //   try {
  //     const { name, email, password, role } = req.body;
  
  //     // Check if the email already exists
  //     const existingUser = await User.findOne({ email, role });
  //     if (existingUser) {
  //       return res.status(400).json({ error: 'Email already exists' });
  //     }
  
  //     // Create a new user
  //     const newUser = await userService.createUser({ name, email, password, role });
  //     res.status(201).json(newUser);
  //   } catch (error) {
  //     console.error(error); // Log the error for debugging purposes
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
    
  // }
  async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      // Check if the user creating the new user is an Admin
      const creatingUser = req.userId; // Assuming you have the authenticated user's ID stored in req.userId
      const creatingUserRole = req.userRole; // Assuming you have the authenticated user's role stored in req.userRole
  
      if (creatingUserRole !== 'admin') {
        return res.status(401).json({ error: 'Only Admin users can create new users' });
      }
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email,role });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Create a new user
      const newUser = await userService.createUser({ name, email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      if (updatedUserData.email) {
        const existingUser = await User.findOne({ email: updatedUserData.email, role: updatedUserData.role });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }
      const user = await userService.updateUser(userId, updatedUserData);
      res.json(user);
    } catch (error){
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password, role } = req.body;

      const token = await authService.signIn(email, password, role);

      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
  
}

module.exports = UserController;
    
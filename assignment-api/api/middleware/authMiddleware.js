// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
//     req.userId = decoded.userId;
//     req.role = decoded.role;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = verifyToken;


// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log(token)
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
//     req.userId = decoded.userId;
//     req.role = decoded.role;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
//   };
  

//   module.exports = verifyToken;

// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     console.log("Token:", token);
//     console.log("Decoded:", decoded);
//     console.log("Error:", err);

//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     // Token is valid, extract the user ID and role from the decoded payload
//     req.userId = decoded.userId;
//     req.userRole = decoded.role;
//     next();
//   });
// }

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, extract the user ID and role from the decoded payload
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
}

module.exports = verifyToken;
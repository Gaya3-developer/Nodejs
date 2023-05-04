const jwt = require('jsonwebtoken');
const db = require('../models');
const User=db.users

async function getUserNameFromJwt(token) {
    console.log(token)
  const decodedToken = jwt.decode(token);
  console.log('uuuuuuuuuuuuuuuuuuuuuuuuu',decodedToken)
  if (!decodedToken) {
    throw new Error('Invalid JWT token');
  }
    return decodedToken;
}

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized Access');
  }
  const token = authHeader.substring(7);
  try {
    const username = await getUserNameFromJwt(token);
    console.log(username)
    const user = await User.findOne({ where: { u_name: username.u_name} });
    if (!user) {
      return res.status(401).send('Unauthorized access');
    }
    if (user.role !== 'admin') {
      return res.status(403).send('Forbidden access');
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Someting went wrong');
  }
};

module.exports = authorization;


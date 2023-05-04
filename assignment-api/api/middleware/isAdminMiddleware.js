function isAdmin(req, res, next) {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    next();
  }
  
  module.exports = isAdmin;
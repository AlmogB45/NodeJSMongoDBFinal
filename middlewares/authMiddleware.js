const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../auth'); // Assuming auth.js is in the same directory

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    authenticateJWT(req, res, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden: Invalid token
      }

      req.user = user; // Attach user object to the request for protected routes
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized: Missing token
  }
};

module.exports = authMiddleware;

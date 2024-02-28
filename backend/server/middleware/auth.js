const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

  if (token == null) {
    return res.sendStatus(401); // If no token, return unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // If token is not valid, return forbidden
    }

    // Token is valid, attach user info to request
    req.user = user;
    next(); // Proceed to the next middleware or request handler
  });
};

module.exports = { authenticateToken };

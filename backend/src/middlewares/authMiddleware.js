const jwt = require('jsonwebtoken');

// Middleware function to authenticate the user using JWT
const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Call the next middleware or route handler
  });
};

module.exports = authenticateToken;

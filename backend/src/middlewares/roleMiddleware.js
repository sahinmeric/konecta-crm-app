// Middleware function to check if the user has the required role
const authorizeRole = (role) => {
  return (req, res, next) => {
    // Check if the user has the required role
    if (req.user && req.user.role === role) {
      next(); // User has the correct role, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
  };
};

module.exports = authorizeRole;

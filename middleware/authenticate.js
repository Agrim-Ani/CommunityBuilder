const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
    let authHeader = req.headers.Authorization||req.headers.authorization;
    const tokens = authHeader.split(' ');
    const token = tokens[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateMiddleware;
// auth middleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET;

exports.requiredAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token provided' });
    const parts = header.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });
    const token = parts[1];
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// set req.user if token present but don't fail
exports.optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return next();
    const parts = header.split(' ');
    if (parts.length !== 2) return next();
    const token = parts[1];
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next();
    req.user = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    next();
  } catch (err) {
    next();
  }
};



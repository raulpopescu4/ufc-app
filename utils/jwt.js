const jwt = require('jsonwebtoken');

const generateTestToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { generateTestToken };

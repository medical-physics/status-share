const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.body.token || req.query.token || req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(403).send('A token is required for authentication.');
  }

  const token = bearerHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.decodedToken = decodedToken;
  } catch (err) {
    return res.status(401).send('Invalid token.');
  }

  return next();
};

module.exports = verifyToken;

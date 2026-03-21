// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

require('dotenv').config()

const motsecret=process.env.JWT_SECRET
module.exports = function auth(req, res, next) {
  const header = req.headers.authorization; 
  if (!header) {
   return res.status(401).json({ message: 'Token manquant' });
  }
  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token , motsecret);
    req.etudiant = payload; 
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
``
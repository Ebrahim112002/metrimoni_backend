const admin = require('firebase-admin');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { email: decoded.email.toLowerCase(), uid: decoded.uid };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

//const authorizeAdmin = (usersCollection) => async (req, res, next) => {
 // const user = await usersCollection.findOne({ email: req.user.email });
 // if (!user || user.role !== 'admin') {
   // return res.status(403).json({ error: 'Forbidden: Admin access required' });
 // }
  //next();
//};

module.exports = { authenticate, authorizeAdmin };
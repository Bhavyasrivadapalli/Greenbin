// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // store decoded user info
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

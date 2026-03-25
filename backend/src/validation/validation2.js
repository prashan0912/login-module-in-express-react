// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // attach user info
    next(); // go to next route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default authMiddleware
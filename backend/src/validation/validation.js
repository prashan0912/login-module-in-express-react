import jwt from "jsonwebtoken";
import { serverConfig } from "../config/serverConfig.js";

async function authValidation(req, res, next) {
  // try {

  const token = req.cookies["authToken"];
  console.log("validation ",token)
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authorized",
      message: "no  auth token provided",
    });
  }
  const decoded = jwt.verify(token, serverConfig.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authorized",
      message: "invalid auth token provided",
    });
  }
  req.user = {
    email: decoded.email,
    id: decoded.id,
  };
  next();
}

export { authValidation };

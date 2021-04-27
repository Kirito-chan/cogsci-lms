// middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getToken } from "./auth.js";

const isAdminAuth = function (req, res, next) {
  const decodedToken = jwt.decode(getToken(req));

  if (decodedToken) {
    const isAdmin = decodedToken.isAdmin;
    if (isAdmin) {
      next();
    } else {
      res.status(401).send("Unauthorized: Invalid token without admin role");
    }
  } else {
    res.status(401).send("Unauthorized: No token provided");
  }
};
export default isAdminAuth;

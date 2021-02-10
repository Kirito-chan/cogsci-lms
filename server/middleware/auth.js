// middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_PRIVATE_KEY;

const withAuth = function (req, res, next) {
  const { token } = req.body;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};
export default withAuth;

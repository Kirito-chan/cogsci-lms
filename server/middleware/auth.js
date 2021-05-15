// middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_PRIVATE_KEY;

export const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    return req.headers.authorization.split(" ")[1];

  return null;
};

const withAuth = function (req, res, next) {
  const token = getToken(req);

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        next();
      }
    });
  }
};
export default withAuth;

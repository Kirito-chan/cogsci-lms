// middleware.js
import jwt from "jsonwebtoken";
const secret = "secret";

const withAuth = function (req, res, next) {
  const { token } = req.body;
  console.log("tokenik: " + token);
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

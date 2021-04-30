import jwt from "jsonwebtoken";
import { getToken } from "./auth.js";

const isEnrolledInSubjectAuth = function (req, res, next) {
  let subjectId;
  subjectId = req.params.subjectId;
  if (!subjectId) {
    subjectId = req.query.subjectId;
  }
  if (!subjectId) return;

  const decodedToken = jwt.decode(getToken(req));

  if (decodedToken) {
    const enrolledCourses = decodedToken.enrolledCourses;
    for (const course of enrolledCourses) {
      if (course.id == subjectId) {
        next();
        return;
      }
    }
    res
      .status(401)
      .send(
        "Unauthorized: Invalid token without rights for subject id = " +
          subjectId
      );
  } else {
    res.status(401).send("Unauthorized: No token provided");
  }
};
export default isEnrolledInSubjectAuth;

import * as queries from "./queries.js";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import withAuth from "./middleware/auth.js";

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

const isCorrectPassword = (typedPassword, DBpassword, salt) => {
  return typedPassword === `${DBpassword}{${salt}}`;
};

app.post("/api/checkToken", withAuth, function (req, res) {
  console.log("som v checkToken");
  res.sendStatus(200);
});

const secret = "secret";
// POST route to login a user
app.post("/api/login", async function (req, res) {
  const { username, password } = req.body;
  console.log(username);
  const query = `SELECT * FROM user WHERE username = ${username}`;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  const rows = await queries.getUser(username);
  console.log("tunaj v server: " + rows);
  if (
    rows != undefined /*isCorrectPassword(hashedPassword, DBpassword, salt)*/
  ) {
    // Issue token
    console.log("som tu");
    const payload = { username };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const salt = rows.salt;
    const DBpassword = rows.password;
    res.json({ token: token });
  } else {
    res.json({ token: "" });
  }
});

// POST route to register a user
app.post("/api/register", function (req, res) {
  const { firstName, lastName, username, password, email } = req.body;
  const query = `INSERT INTO user (first_name, last_name, username, password, email, role, salt, last_visited_announcements)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const studentRole = 1;
  const adminRole = 0;
  const hashedPassword = "hash(password)";
  const salt = "generateSalt()";
  // prettier-ignore
  const date = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString("en-GB");
  console.log(date);
  // prettier-ignore
  const array = [firstName, lastName, username, hashedPassword, email, studentRole, salt, date];
});

// get attendance
app.get("/api/attendance/:userId", async (req, res) => {
  const { userId } = req.params;
  //userId = 346;
  const subjectId = 18;
  const rows = await queries.getAttedance(userId, subjectId);
  console.log("attendance " + rows);
  res.json(rows);
});

// get bonuses
app.get("/api/bonuses/:userId", async (req, res) => {
  const { userId } = req.params;
  const subjectId = 18;
  const rows = await queries.getBonuses(userId, subjectId);
  res.json(rows);
});

// get teacher's presentations
app.get("/api/teacher-presentations/:userId", async (req, res) => {
  const { userId } = req.params;
  const subjectId = 14;
  const row = await queries.getTeacherPresentations(userId, subjectId);
  res.json(row);
});

// get student's presentations
app.get("/api/student-presentations/:userId", async (req, res) => {
  const { userId } = req.params;
  const subjectId = 15;
  const rows = await queries.getStudentPresentations(userId, subjectId);
  res.json(rows);
});

// get my presentation - title and points
app.get("/api/my-presentation/:userId", async (req, res) => {
  const { userId } = req.params;
  const subjectId = 15;
  const rows = await queries.getMyPresentation(userId, subjectId);
  res.json(rows);
});

// get valuation of a certain subject - finds info about given subject e.g. weight of attendance, bonuses, presentation
app.get("/api/subject-valuation", async (req, res) => {
  const subjectId = 18;
  const row = await queries.getSubjectValuation(subjectId);
  res.json(row);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

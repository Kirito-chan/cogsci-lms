import * as queries from "./queries.js";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import withAuth from "./middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

const isCorrectPassword = (typedPassword, DBpassword, salt) => {
  return typedPassword === `${DBpassword}{${salt}}`;
};

app.get("/api/subjects/:userId", async function (req, res) {
  const { userId } = req.params;
  const rows = await queries.getStudentSubjects(userId);
  res.json(rows);
});

app.post("/api/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

// POST route to login a user
const secret = process.env.JWT_PRIVATE_KEY;

app.post("/api/login", async function (req, res) {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username = ${username}`;

  const user = await queries.getUser(username);

  if (
    user != undefined /*isCorrectPassword(hashedPassword, DBpassword, salt)*/
  ) {
    // Issue token
    const DBpassword = user.password;
    const payload = { username, password };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const salt = user.salt;

    // console.log(password);

    // const pass = `${password}{${salt}}`;
    // console.log(pass);

    // const hashedPassword = crypto
    //   .createHash("sha512")
    //   .update(pass)
    //   .digest("hex");
    // console.log(hashedPassword);
    // console.log("a");
    // console.log(DBpassword);
    // if (hashedPassword == DBpassword) {
    //   console.log("juchuu");
    // }

    res.json({ token, user });
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
app.get("/api/attendance/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;

  //userId = 346;
  //const subjectId = 18;
  const rows = await queries.getAttedance(userId, subjectId);
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
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

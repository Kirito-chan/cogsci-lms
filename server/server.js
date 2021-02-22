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

const isCorrectPassword = (typedPassword, salt, DBpassword) => {
  const password = `${typedPassword}{${salt}}`;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  return hashedPassword === DBpassword;
};

app.get("/api/subjects/:userId", async function (req, res) {
  const { userId } = req.params;
  const rows = await queries.getStudentSubjects(userId);
  res.json(rows);
});

app.get("/api/subject/:subjectId", async function (req, res) {
  const { subjectId } = req.params;
  const row = await queries.getSubject(subjectId);
  res.json(row);
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

  if (user === undefined) {
    res.status(404).send(`Užívateľ s menom "${username}" neexistuje`);
    return;
  }

  if (isCorrectPassword(password, user.salt, user.password)) {
    // Issue token
    const payload = { username, password };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // vygenerujem salt - vygenerujem nanoId
    // spojim password z registracneho formu a spojim so saltom (ako v pass o 2 riadky nizsie)
    // a zahshujem ako hashedPassword

    res.json({ token, user });
  } else {
    res.status(401).send("Nesprávne heslo");
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
  // prettier-ignore
  const array = [firstName, lastName, username, hashedPassword, email, studentRole, salt, date];
});

// get attendance
app.get("/api/attendance/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;
  const rows = await queries.getAttedance(userId, subjectId);
  res.json(rows);
});

// Bonuses
app.get("/api/bonus/", async (req, res) => {
  const { userId, subjectId } = req.query;
  const rows = await queries.getBonuses(userId, subjectId);
  res.json(rows);
});

app.get("/api/bonus/:bonusId", async (req, res) => {
  const { bonusId } = req.params;
  const rows = await queries.getBonus(bonusId);
  res.json(rows);
});

// comments
app.get("/api/comment", async (req, res) => {
  const { bonusId } = req.query;
  const rows = await queries.getComments(bonusId);
  //console.log(rows);
  res.json(rows);
});

// get teacher's presentations
app.get("/api/teacher-presentations/:userId/:subjectId", async (req, res) => {
  //
  // /api/teacher-presentation/           // /api/teacher-presentation/?user_id=241&subject_id=18
  // /api/teacher-presentation/:id
  const { userId, subjectId } = req.params;
  //subjectId = 14;
  const row = await queries.getTeacherPresentations(userId, subjectId);
  res.json(row);
});

// get student's presentations
app.get("/api/student-presentations/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;
  //const subjectId = 15;
  const rows = await queries.getStudentPresentations(userId, subjectId);
  res.json(rows);
});

// get my presentation - title and points
app.get("/api/my-presentation/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;
  //const subjectId = 15;
  const presentations = await queries.getMyPresentation(userId, subjectId);
  const presentationWeight = await queries.getPresentationWeight(subjectId);
  res.json({ presentations, presentationWeight });
});

// get valuation of a certain subject - finds info about given subject e.g. weight of attendance, bonuses, presentation
app.get("/api/subject-valuation/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  const row = await queries.getSubjectValuation(subjectId);
  res.json(row);
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

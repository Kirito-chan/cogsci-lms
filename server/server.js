import * as queries from "./queries.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// get attendance
app.get("/api/attendance/:userId", async (req, res) => {
  let { userId } = req.params;
  userId = 346;
  const subjectId = 18;
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

import * as queries from "./queries.js";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import withAuth from "./middleware/auth.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as constants from "./constants.js";

dotenv.config();

const app = express();

const getCurrentDate = () => {
  return (
    new Date().toISOString().slice(0, 10) +
    " " +
    new Date().toLocaleTimeString("en-GB")
  );
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.post("/api/admin/subject/:subjectId/bonus", async function (req, res) {
  const { title, content, urlRef } = req.body;
  const { subjectId } = req.params;
  const created = getCurrentDate();
  //prettier-ignore
  const bonusId = await queries.insertBonus(subjectId, title, content, urlRef, created);
  res.json(bonusId);
});

const isCorrectPassword = (typedPassword, salt, DBpassword) => {
  const password = `${typedPassword}{${salt}}`;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  return hashedPassword === DBpassword;
};

// subjects student
app.get("/api/subjects", async function (req, res) {
  const { userId } = req.query;
  const rows = await queries.getStudentSubjects(userId);
  res.json(rows);
});

// subjects admin
app.get("/api/admin/subjects", async function (req, res) {
  const rows = await queries.getAllSubjects();
  res.json(rows);
});

app.get("/api/subject/:subjectId", async function (req, res) {
  const { subjectId } = req.params;
  const row = await queries.getSubject(subjectId);
  res.json(row);
});

app.post("/api/admin/subjects", async function (req, res) {
  let { name, year, season, about, userLimit, weeks, active } = req.body;
  if (about === undefined) about = null;
  const subjectId = await queries.insertSubject(
    name,
    year,
    season,
    about,
    userLimit,
    weeks,
    active
  );
  await queries.insertSubjectValuation(
    subjectId,
    constants.A,
    constants.B,
    constants.C,
    constants.D,
    constants.E,
    constants.Fx
  );
  res.json(subjectId);
});

app.post("/api/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

// POST route to login a user
const secret = process.env.JWT_PRIVATE_KEY;

app.post("/api/login", async function (req, res) {
  const { username, password } = req.body;
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
    // a zahashujem ako hashedPassword
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
  const date = getCurrentDate();
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

app.put("/api/admin/bonus/:bonusId", async (req, res) => {
  const { bonusId } = req.params;
  const { title, content, videoURL } = req.body;
  // prettier-ignore
  const date = getCurrentDate();
  await queries.updateBonusInfo(bonusId, title, content, videoURL, date);
  res.json({ bonusId });
});

app.delete("/api/admin/bonus/:bonusId", async (req, res) => {
  const { bonusId } = req.params;
  await queries.deleteBonus(bonusId);
  res.json(bonusId);
});

// bonus comments
app.get("/api/bonus/:bonusId/comment", async (req, res) => {
  const { bonusId } = req.params;
  const rows = await queries.getBonusComments(bonusId);
  res.json(rows);
});

app.post("/api/bonus/:bonusId/comment", async (req, res) => {
  const { bonusId } = req.params;
  const { userId, content, refCommentId } = req.body;
  const date = getCurrentDate();
  // prettier-ignore
  const id = await queries.insertBonusComment(bonusId, userId, content, date, refCommentId);
  res.json(id);
});

app.patch("/api/admin/bonus/:bonusId/comment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { valuated } = req.body;
  if (valuated !== undefined)
    await queries.updateBonusValuated(commentId, valuated);
  res.json(valuated);
});

// presentation comments
app.get(
  "/api/presentation/:presentationId/student/comment",
  async (req, res) => {
    const { presentationId } = req.params;
    const rows = await queries.getPresentationComments(
      presentationId,
      constants.STUDENT
    );
    res.json(rows);
  }
);

app.get(
  "/api/presentation/:presentationId/teacher/comment",
  async (req, res) => {
    const { presentationId } = req.params;
    const rows = await queries.getPresentationComments(
      presentationId,
      constants.TEACHER
    );
    res.json(rows);
  }
);

app.post(
  "/api/presentation/:presentationId/teacher/comment",
  async (req, res) => {
    const { presentationId } = req.params;
    const { userId, content, refCommentId } = req.body;
    const date = getCurrentDate();
    // prettier-ignore
    const id = await queries.insertPresentationComment(presentationId, userId, content, date, refCommentId, constants.TEACHER);
    res.json(id);
  }
);

app.post(
  "/api/presentation/:presentationId/student/comment",
  async (req, res) => {
    const { presentationId } = req.params;
    const { userId, content, refCommentId } = req.body;
    const date = getCurrentDate();
    // prettier-ignore
    const id = await queries.insertPresentationComment(presentationId, userId, content, date, refCommentId, constants.STUDENT);
    res.json(id);
  }
);

app.patch("/api/admin/presentation/:presentationId", async (req, res) => {
  const { presentationId } = req.params;
  const { status } = req.body;
  if (status) await queries.updatePresentationStatus(presentationId, status);
  res.json(status);
});

// presentation valuation types
app.get("/api/presentation/valuation-types", async (req, res) => {
  const { subjectId } = req.query;
  const rows = await queries.getPresentationValuationTypes(subjectId);
  res.json(rows);
});

// get teacher's presentations
app.get("/api/teacher-presentations/:userId/:subjectId", async (req, res) => {
  //
  // /api/teacher-presentation/           // /api/teacher-presentation/?user_id=241&subject_id=18
  // /api/teacher-presentation/:id
  const { userId, subjectId } = req.params;
  const row = await queries.getTeacherPresentations(userId, subjectId);
  res.json(row);
});

// get student's presentations
app.get("/api/student-presentations/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;
  const { status } = req.query;
  const rows = await queries.getStudentPresentations(userId, subjectId, status);
  res.json(rows);
});

// get my presentation - title and points
app.get("/api/my-presentation/:userId/:subjectId", async (req, res) => {
  const { userId, subjectId } = req.params;
  const presentation = await queries.getMyPresentation(userId, subjectId);
  const presentationWeight = await queries.getPresentationWeight(subjectId);
  res.json({ presentation, presentationWeight });
});

// download presentation
app.get(
  "/api/subject/:subjectId/presentation/:presentationId/download",
  (req, res) => {
    const { presentationId, subjectId } = req.params;
    const { filename, teacherPres } = req.query;
    let filePath = "";
    if (teacherPres == "true") {
      filePath = `uploads/teacher/${subjectId}/${presentationId}_${filename}`;
    } else filePath = `uploads/${subjectId}/${presentationId}_${filename}`;
    res.download(filePath);
  }
);

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const { subjectId } = req.params;
    const { teacherPres } = req.query;
    let destFolder = "uploads";
    if (teacherPres == "true") {
      destFolder += "/teacher";
    }
    destFolder += "/" + subjectId;
    callBack(null, destFolder);
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

let upload = multer({ storage: storage });

// co robi await? ked ho tam dam a ked ho tam nedam?
// prettier-ignore
app.post("/api/subject/:subjectId/presentation/upload", upload.single("file"),
  async (req, res, next) => {
    const { subjectId } = req.params;
    const { teacherPres, userId } = req.query;
    const file = req.file;
    // prettier-ignore
    const presId = await queries.insertPresentation(path.parse(file.filename).name, file.filename, constants.STUD_PRES_NEUTRAL, parseInt(userId));
    await queries.updatePresentation(presId, userId, subjectId)
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    let destFolder = "uploads";
    if (teacherPres == "true") {
      destFolder += "/teacher";
    }
    destFolder += "/" + subjectId + "/";
    fs.rename(destFolder + file.filename, destFolder + presId + "_" + file.filename, function(err) {
      if ( err ) console.log('ERROR: ' + err);
  });
    res.json({subjectId, userId});
  }
);

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

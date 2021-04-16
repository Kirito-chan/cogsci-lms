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
import bcrypt from "bcrypt";
import * as constants from "./constants.js";
import * as mailer from "./mailer.js";

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

/* ... */

app.post("/api/send_email", function (req, res) {
  res.set("Content-Type", "application/json");

  const { toEmail, fromEmail, fromName, subject, text } = req.body;

  const messageInfo = {
    toEmail,
    fromEmail,
    fromName,
    subject,
    text,
  };

  mailer.sendOne(messageInfo);

  res.send('{"message":"Email sent."}');
});

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

app.patch("/api/subject/:subjectId", async function (req, res) {
  const { subjectId } = req.params;
  const { status } = req.body;
  await queries.updateSubjectStatus(subjectId, status);
  res.json(status);
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
  await queries.insertSubjectValuation(subjectId);
  res.json(subjectId);
});

// admin loading students

app.get(
  "/api/admin/subject/:subjectId/students/pending",
  async function (req, res) {
    const { subjectId } = req.params;
    const rows = await queries.getPendingStudents(subjectId);
    res.json(rows);
  }
);

app.get(
  "/api/admin/subject/:subjectId/students/accepted",
  async function (req, res) {
    const { subjectId } = req.params;
    const rows = await queries.getAcceptedStudents(subjectId);
    res.json(rows);
  }
);

app.get(
  "/api/admin/subject/:subjectId/students/rejected",
  async function (req, res) {
    const { subjectId } = req.params;
    const rows = await queries.getRejectedStudents(subjectId);
    res.json(rows);
  }
);

app.post("/api/subject/:subjectId/sign-in", async function (req, res) {
  const { subjectId } = req.params;
  const { userId } = req.body;
  const id = await queries.insertNewUserToSubject(userId, subjectId);
  res.json(id);
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

    res.json({ token, user });
  } else {
    res.status(401).send("Nesprávne heslo");
  }
});

// POST route to register a user
app.post("/api/register", async function (req, res) {
  const {
    firstName,
    lastName,
    username,
    password,
    passwordAgain,
    email,
  } = req.body;
  if (password !== passwordAgain) {
    res.status(403).send("Heslá sa nezhodujú !");
    return;
  }

  const user = await queries.getUser(username);
  const userEmail = await queries.getUserWithEmail(email);

  if (user) {
    res.status(409).send("Zadané prihlasovacie meno už existuje, zvoľte iné !");
    return;
  }
  if (userEmail) {
    res.status(409).send("Zadaný email už existuje, zvoľte iný !");
    return;
  }
  const typedPassword = password;

  const salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
  const passwordAndSalt = `${typedPassword}{${salt}}`;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(passwordAndSalt)
    .digest("base64");
  const date = getCurrentDate();

  const id = await queries.registerUser(
    firstName,
    lastName,
    username,
    hashedPassword,
    email,
    salt,
    date
  );
  res.json(id);
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
  const { title, content, videoURL, isFocusingURL } = req.body;
  // prettier-ignore
  const date = getCurrentDate();
  await queries.updateBonusInfo(
    bonusId,
    title,
    content,
    videoURL,
    date,
    isFocusingURL
  );
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

app.delete(
  "/api/admin/subject/:subjectId/presentation/:presentationId",
  async (req, res) => {
    const { presentationId, subjectId } = req.params;
    const { path } = req.query;
    const editedPath = `uploads/teacher/${subjectId}/${presentationId}_${path}`;
    await queries.deletePresentation(presentationId);
    fs.unlink(editedPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.json(presentationId);
  }
);

app.post(
  "/api/admin/subject/:subjectId/settings/presentation-criteria",
  async (req, res) => {
    const { subjectId } = req.params;
    const { criteria } = req.body;
    const { wereJustUpdatedNotDeletedOrInserted } = req.query;

    if (wereJustUpdatedNotDeletedOrInserted == "true") {
      for (const criterion of criteria) {
        await queries.updatePresentationCriteria(
          criterion.id,
          criterion.name,
          criterion.height
        );
      }
      res.json(subjectId);
    } else {
      await queries.deletePresentationCriteria(subjectId);
      const id = await queries.insertPresentationCriteria(subjectId, criteria);
      res.json(id);
    }
  }
);

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

app.get("/api/admin/subject/:subjectId/email", async (req, res) => {
  const { subjectId } = req.params;
  const rows = await queries.getUserEmailsAndNames(subjectId);
  res.json(rows);
});

// insert evaluation of a presentation that is taken from Sliders form
app.post(
  "/api/subject/:subjectId/presentation/:presentationId/evaluation",
  async (req, res) => {
    const { subjectId, presentationId } = req.params;
    const { userWhoEvaluatesId, evaluatedUserId } = req.query;
    const { values } = req.body;

    const whoseUslId = await queries.getUslId(subjectId, userWhoEvaluatesId);
    const targetUslId = await queries.getUslId(subjectId, evaluatedUserId);

    for (const element of values) {
      const pvpId = await queries.getPvpId(subjectId, element.name);
      await queries.insertPresentationValuation(
        whoseUslId,
        targetUslId,
        pvpId,
        element.value
      );
    }

    // await Promise.all(values.map(async (element) => {
    //   const pvpId = await queries.getPvpId(subjectId, element.name);
    //   await queries.insertPresentationValuation(
    //     whoseUslId,
    //     targetUslId,
    //     pvpId,
    //     element.value
    //   );
    // }));

    res.json(presentationId);
  }
);

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

app.post(
  "/api/subject/:subjectId/presentation/upload",
  upload.single("file"),
  async (req, res, next) => {
    const { subjectId } = req.params;
    const { teacherPres, userId } = req.query;
    const file = req.file;
    let presId = null;

    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    if (teacherPres === "true") {
      presId = await queries.insertTeacherPresentation(
        subjectId,
        path.parse(file.filename).name,
        file.filename,
        getCurrentDate()
      );
    } else {
      presId = await queries.insertStudentPresentation(
        path.parse(file.filename).name,
        file.filename,
        parseInt(userId)
      );
      await queries.updatePresentation(presId, userId, subjectId);
    }
    let destFolder = "uploads";
    if (teacherPres === "true") {
      destFolder += "/teacher";
    }
    destFolder += "/" + subjectId + "/";
    fs.rename(
      destFolder + file.filename,
      destFolder + presId + "_" + file.filename,
      function (err) {
        if (err) console.log("ERROR: " + err);
      }
    );
    res.json({ subjectId, userId });
  }
);

// get valuation of a certain subject - finds info about given subject e.g. weight of attendance, bonuses, presentation
app.get("/api/subject-valuation/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  const row = await queries.getSubjectValuation(subjectId);
  res.json(row);
});

app.put("/api/subject-valuation/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  const { gradeA, gradeB, gradeC, gradeD, gradeE, gradeFx } = req.body;
  if (
    !isNaN(gradeA) &&
    !isNaN(gradeB) &&
    !isNaN(gradeC) &&
    !isNaN(gradeD) &&
    !isNaN(gradeE) &&
    !isNaN(gradeFx)
  ) {
    await queries.updateSubjectValuation(
      subjectId,
      gradeA,
      gradeB,
      gradeC,
      gradeD,
      gradeE,
      gradeFx
    );
    res.json(subjectId);
  } else {
    res.sendStatus(415);
  }
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

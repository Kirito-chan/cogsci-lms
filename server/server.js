import * as queries from "./queries.js";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import withAuth from "./middleware/auth.js";
import { getToken } from "./middleware/auth.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import * as constants from "./constants.js";
import * as mailer from "./mailer.js";
import isAdminAuth from "./middleware/isAdminAuth.js";
import isEnrolledInSubjectAuth from "./middleware/isEnrolledInSubjectAuth.js";
import { convertDateToSQLFormat, getCurrentDate } from "./DateUtils.js";
import pool from "./db.js";

dotenv.config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.post("/api/admin/send-email", isAdminAuth, async function (req, res) {
  res.set("Content-Type", "application/json");

  const { toEmail, fromEmail, fromName, subject, text } = req.body;
  if (!subject || subject.trim() === "" || !text || text.trim() === "") return;

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

// forgotten and reseted password endpoints
app.put("/api/forgotten-password/send-email", async function (req, res) {
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
        const { email } = req.body;
        const fromName = "Admin KV";
        const subject = "Obnovenie hesla";
        const fromEmail = constants.FROM_EMAIL_RESET_PASSWORD;

        const user = await queries.getUserByEmail(email, conn);
        if (user == null) {
          console.error("Email not in DB");
          res.status(403).send("Zadaný email neexistuje");
          return;
        }

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
          .createHash("sha512")
          .update(token)
          .digest("base64");
        const expires = convertDateToSQLFormat(new Date().addHours(1));

        await queries.updateUserResetPassword(
          hashedToken,
          expires,
          user.id,
          conn
        );
        const text = constants.getEmailTextForResetPassword(
          process.env.CLIENT_URL,
          user.id,
          token
        );

        const toEmail = [];
        toEmail.push(email);
        const messageInfo = {
          toEmail,
          fromEmail,
          fromName,
          subject,
          text,
        };

        conn.commit().then(() => {
          mailer.sendOne(messageInfo);
          res.send('{"message":"Email sent."}');
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

app.get("/api/reseted-password/check-expiration", async function (req, res) {
  const { userId, token } = req.query;

  const hashedTokenUrl = crypto
    .createHash("sha512")
    .update(token)
    .digest("base64");

  const currentDate = getCurrentDate();

  const user = await queries.checkUserResetPasswordToken(
    userId,
    hashedTokenUrl,
    currentDate
  );

  if (user == undefined) {
    res.status(403).send("Token je neplatný alebo expiroval");
    return;
  }

  res.json({
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
  });
});

app.patch("/api/reseted-password/change-password", async function (req, res) {
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
        const { userId, token } = req.query;
        const { password } = req.body;

        const hashedTokenUrl = crypto
          .createHash("sha512")
          .update(token)
          .digest("base64");

        const currentDate = getCurrentDate();

        const user = await queries.checkUserResetPasswordToken(
          userId,
          hashedTokenUrl,
          currentDate,
          conn
        );

        if (user == undefined) {
          res.status(403).send("Token is invalid or has already expired.");
          return;
        }

        const salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
        const passwordAndSalt = `${password}{${salt}}`;
        const hashedPassword = crypto
          .createHash("sha512")
          .update(passwordAndSalt)
          .digest("base64");

        await queries.updateUserPasswordAndTokens(
          userId,
          hashedPassword,
          salt,
          currentDate,
          conn
        );

        conn.commit().then(() => {
          res.json(userId);
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

app.post(
  "/api/admin/subject/:subjectId/bonus",
  isAdminAuth,
  async function (req, res) {
    const { title, content, urlRef } = req.body;
    const { subjectId } = req.params;
    const created = getCurrentDate();
    //prettier-ignore
    const bonusId = await queries.insertBonus(subjectId, title, content, urlRef, created);
    res.json(bonusId);
  }
);

// subjects student
app.get("/api/subject", async function (req, res) {
  const { userId } = req.query;
  const rows = await queries.getStudentSubjects(userId);
  res.json(rows);
});

// subjects admin
app.get("/api/admin/subject", isAdminAuth, async function (req, res) {
  const rows = await queries.getAllSubjects();
  res.json(rows);
});

// subjects admin
app.put(
  "/api/admin/subject/:subjectId",
  isAdminAuth,
  async function (req, res) {
    const { subjectId } = req.params;
    const {
      name,
      year,
      season,
      about,
      userLimit,
      weeks,
      active,
      subjectValPres,
      subjectValAttendance,
      subjectValComment,
    } = req.body;

    await queries.updateSubject(
      subjectId,
      name,
      year,
      season,
      about,
      userLimit,
      weeks,
      active,
      subjectValPres,
      subjectValAttendance,
      subjectValComment
    );
    res.json(subjectId);
  }
);

app.get(
  "/api/subject/:subjectId",
  isEnrolledInSubjectAuth,
  async function (req, res) {
    const { subjectId } = req.params;
    const row = await queries.getSubject(subjectId);
    res.json(row);
  }
);

app.patch(
  "/api/admin/subject/:subjectId",
  isAdminAuth,
  async function (req, res) {
    const { subjectId } = req.params;
    const { status } = req.body;
    await queries.updateSubjectStatus(subjectId, status);
    res.json(status);
  }
);

app.post("/api/admin/subject", isAdminAuth, async function (req, res) {
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
        let { name, year, season, about, userLimit, weeks, active } = req.body;

        if (about === undefined) about = null;
        const subjectId = await queries.insertSubject(
          name,
          year,
          season,
          about,
          userLimit,
          weeks,
          active,
          conn
        );
        const teachersIds = await queries.getAllTeachersIds(conn);
        for (const teacher of teachersIds) {
          await queries.insertTeacherToUSL(teacher.id, subjectId, conn);
        }
        let newPresFolderStudents = "uploads/" + subjectId;
        let newPresFolderTeachers = "uploads/teacher/" + subjectId;

        if (!fs.existsSync(newPresFolderStudents)) {
          fs.mkdirSync(newPresFolderStudents);
        }
        if (!fs.existsSync(newPresFolderTeachers)) {
          fs.mkdirSync(newPresFolderTeachers);
        }

        await queries.insertSubjectValuation(subjectId, conn);

        conn.commit().then(() => {
          res.json(subjectId);
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

// admin loading students

app.get(
  "/api/admin/subject/:subjectId/student",
  isAdminAuth,
  async function (req, res) {
    const { status } = req.query;
    const { subjectId } = req.params;
    let rows = null;
    if (status === "pending") {
      rows = await queries.getStudents(subjectId, constants.PENDING_FOR_SUBJ);
    } else if (status === "accepted") {
      rows = await queries.getStudents(subjectId, constants.ACCEPTED_TO_SUBJ);
    } else {
      rows = await queries.getStudents(subjectId, constants.REJECTED_TO_SUBJ);
    }
    res.json(rows);
  }
);

app.put(
  "/api/admin/subject/:subjectId/student/:studentId",
  isAdminAuth,
  async function (req, res) {
    const { subjectId, studentId } = req.params;
    const { status } = req.body;
    await queries.updateUserStatus(subjectId, studentId, status);
    res.json(studentId);
  }
);

app.get(
  "/api/admin/subject/:subjectId/overall-bonuses",
  isAdminAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const students = await queries.getStudentsBySubjectId(
            subjectId,
            conn
          );
          const studentBonusesArr = [];
          for (const student of students) {
            const bonuses = await queries.getBonusesOfStudent(
              student.id,
              subjectId,
              conn
            );
            studentBonusesArr.push({ student, bonuses });
          }
          conn.commit().then(() => {
            res.json(studentBonusesArr);
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

app.put(
  "/api/admin/subject/:subjectId/overall-bonuses",
  isAdminAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const { checkedBonuses } = req.body;

          for (const checkedBonus of checkedBonuses) {
            const student = checkedBonus.student;
            const bonuses = checkedBonus.bonuses;

            for (const bonus of bonuses) {
              const studentId = student.id;
              const valuated =
                bonus.isChecked == constants.NOT_YET_EVALUATED_BONUS_POINTS
                  ? null
                  : bonus.isChecked == constants.NOT_YET_COMMENTED
                  ? undefined
                  : parseInt(bonus.isChecked);
              const bonusId = bonus.bonusId;

              const commentId = await queries.getBonusCommentForUser(
                studentId,
                bonusId,
                conn
              );

              if (valuated !== undefined)
                await queries.updateBonusValuated(commentId, valuated, conn);
            }
          }

          conn.commit().then(() => {
            res.json(subjectId);
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

app.get(
  "/api/admin/subject/:subjectId/overall-attendance",
  isAdminAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const students = await queries.getStudentsBySubjectId(
            subjectId,
            conn
          );
          const studentAttendancesArr = [];
          for (const student of students) {
            const attendances = await queries.getAttendancesOfStudent(
              student.id,
              subjectId,
              conn
            );
            studentAttendancesArr.push({ student, attendances });
          }

          conn.commit().then(() => {
            res.json(studentAttendancesArr);
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

app.put(
  "/api/admin/subject/:subjectId/overall-attendance",
  isAdminAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const { checkedAttendances } = req.body;

          for (const checkedAttendance of checkedAttendances) {
            const student = checkedAttendance.student;
            const attendances = checkedAttendance.attendances;

            for (const attendance of attendances) {
              const studentId = student.id;
              const isChecked = attendance.isChecked;
              const attendanceId = attendance.attendanceId;
              const hasAttendance = await queries.userHasAttendance(
                studentId,
                attendanceId,
                conn
              );

              if (isChecked) {
                if (!hasAttendance) {
                  await queries.insertAttendanceForUser(
                    studentId,
                    attendanceId,
                    conn
                  );
                }
              } else {
                if (hasAttendance) {
                  await queries.deleteAttendanceForUser(
                    studentId,
                    attendanceId,
                    conn
                  );
                }
              }
            }
          }

          conn.commit().then(() => {
            res.json(subjectId);
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

app.put("/api/user/:userId/profile", async function (req, res) {
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
        const { userId } = req.params;
        const {
          firstName,
          lastName,
          username,
          oldPassword,
          password,
          passwordAgain,
          email,
        } = req.body;
        if (password !== passwordAgain) return;
        const user = await queries.getUserById(userId, conn);
        const hashedOldPassword = crypto
          .createHash("sha512")
          .update(`${oldPassword}{${user.salt}}`)
          .digest("base64");
        if (hashedOldPassword !== user.password) {
          res.status(401).send("Nesprávne heslo !");
          return;
        }

        const userWithSameEmail = await queries.getUserByEmail(email, conn);
        if (userWithSameEmail && userWithSameEmail.id != userId) {
          res.status(409).send("Zadaný email už existuje, zvoľte iný !");
          return;
        }

        const userWithSameUsername = await queries.getUserByUsername(
          username,
          conn
        );
        if (userWithSameUsername && userWithSameUsername.id != userId) {
          res
            .status(409)
            .send("Zadané prihlasovacie meno už existuje, zvoľte iné !");
          return;
        }

        let salt;
        let hashedNewPassword;

        if (password) {
          salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
          const passwordAndSalt = `${password}{${salt}}`;
          hashedNewPassword = crypto
            .createHash("sha512")
            .update(passwordAndSalt)
            .digest("base64");
        }

        await queries.updateUser(
          userId,
          firstName,
          lastName,
          username,
          email,
          hashedNewPassword,
          salt,
          conn
        );

        conn.commit().then(() => {
          res.json(userId);
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

// treba osetrit aby student mohol poziadat o pristup iba do aktivneho predmetu
app.post("/api/subject/:subjectId/sign-in", async function (req, res) {
  const { subjectId } = req.params;
  const { userId } = req.body;
  const id = await queries.insertNewUserToSubject(userId, subjectId);
  res.json(id);
});

app.post("/api/check-token", withAuth, function (req, res) {
  res.sendStatus(200);
});

// login a user
app.post("/api/login", async function (req, res) {
  const { username, password } = req.body;
  const user = await queries.getUserByUsername(username);

  if (user === undefined) {
    res.status(404).send(`Užívateľ s menom "${username}" neexistuje`);
    return;
  }

  if (isCorrectPassword(password, user.salt, user.password)) {
    // Issue token
    const enrolledActiveCourses = await queries.getAttendedCoursesOfUser(
      user.id
    );
    const isAdmin = user.role == constants.IS_ADMIN;
    const payload = { id: user.id, isAdmin, enrolledActiveCourses };
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } else {
    res.status(401).send("Nesprávne heslo");
  }
});

app.get("/api/get-token", async function (req, res) {
  const token = getToken(req);
  const secret = process.env.JWT_PRIVATE_KEY;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  } else {
    jwt.verify(token, secret, async function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
        return;
      } else {
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.id;
        const user = await queries.getUserById(userId);
        if (user === undefined) {
          res.status(404).send(`Užívateľ s id = ${userId} neexistuje`);
          return;
        }
        const partialUserInfo = {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        };

        res.json({ token, user: partialUserInfo });
      }
    });
  }
});

// POST route to register a user
app.post("/api/register", async function (req, res) {
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
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

        const user = await queries.getUserByUsername(username, conn);
        const user2 = await queries.getUserByEmail(email, conn);
        const user2Email = user2?.email;

        if (user) {
          res
            .status(409)
            .send("Zadané prihlasovacie meno už existuje, zvoľte iné !");
          return;
        }

        if (user2Email) {
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
          date,
          conn
        );

        conn.commit().then(() => {
          res.json(id);
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

app.get(
  "/api/admin/subject/:subjectId/user/:userId",
  isAdminAuth,
  async function (req, res) {
    const { userId, subjectId } = req.params;
    const user = await queries.getUserByIdAndSubjectId(userId, subjectId);

    if (user === undefined) {
      res.status(404).send(`Užívateľ s id "${userId}" neexistuje`);
      return;
    }

    res.json(user);
  }
);

app.get("/api/admin/user", isAdminAuth, async function (req, res) {
  const users = await queries.getUsers();
  res.json(users);
});

app.patch("/api/admin/user/:userId", isAdminAuth, async function (req, res) {
  const { userId } = req.params;
  const { role } = req.body;
  pool.getConnection().then((conn) => {
    conn.beginTransaction().then(async () => {
      try {
        await queries.updateUserRole(userId, role, conn);
        if (role == constants.IS_ADMIN) {
          const subjects = await queries.getSubjectsWhereUserIsNotIn(
            userId,
            conn
          );
          for (const subject of subjects) {
            await queries.insertTeacherToUSL(userId, subject.id, conn);
          }
        } else if (role == constants.IS_STUDENT) {
          const usls = await queries.getUSLWhereUserIsInAndAdmin(userId, conn);

          for (const uslId of usls) {
            await queries.deleteUserFromUSL(uslId?.id, conn);
          }
        }
        conn.commit().then(() => {
          res.json(userId);
        });
        conn.release();
      } catch (error) {
        conn.rollback();
        conn.release();
        console.error(error);
      }
    });
  });
});

// attendance student
app.get(
  "/api/subject/:subjectId/attendance",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const { userId } = req.query;
    const rows = await queries.getAttendanceAndUser(userId, subjectId);
    res.json(rows);
  }
);

app.post(
  "/api/subject/:subjectId/attendance",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const { userId } = req.query;
          const { password } = req.body;

          const attendanceId = await queries.getAttendanceIdForPassword(
            subjectId,
            password,
            conn
          );

          if (attendanceId) {
            const id = await queries.insertAttendanceForUser(
              userId,
              attendanceId,
              conn
            );

            conn.commit().then(() => {
              res.json(id);
            });
            conn.release();
            return;
          }
          res.status(401).send("Nesprávne heslo");
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

// get attendance admin

app.get(
  "/api/admin/subject/:subjectId/attendance",
  isAdminAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const rows = await queries.getAttendance(subjectId);

    res.json(rows);
  }
);

app.post(
  "/api/admin/subject/:subjectId/attendance",
  isAdminAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const { date, password } = req.body;

    const id = await queries.insertAttendance(
      subjectId,
      convertDateToSQLFormat(date),
      password
    );
    res.json(id);
  }
);

app.patch(
  "/api/admin/subject/:subjectId/attendance/:attendanceId",
  isAdminAuth,
  async (req, res) => {
    const { attendanceId } = req.params;
    const { status } = req.body;
    const rows = await queries.updateAttendanceStatus(attendanceId, status);
    res.json(rows);
  }
);

// Bonuses
app.get("/api/bonus", isEnrolledInSubjectAuth, async (req, res) => {
  const { userId, subjectId } = req.query;
  const rows = await queries.getBonuses(userId, subjectId);
  res.json(rows);
});

app.put("/api/admin/bonus/:bonusId", isAdminAuth, async (req, res) => {
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

app.delete("/api/admin/bonus/:bonusId", isAdminAuth, async (req, res) => {
  const { bonusId } = req.params;
  await queries.deleteBonus(bonusId);
  res.json(bonusId);
});

// bonus comments
app.get("/api/subject/:subjectId/bonus/:bonusId/comment", async (req, res) => {
  const { bonusId } = req.params;
  const rows = await queries.getBonusComments(bonusId);
  res.json(rows);
});

app.post("/api/subject/:subjectId/bonus/:bonusId/comment", async (req, res) => {
  const { bonusId } = req.params;
  const { userId, content, refCommentId } = req.body;

  if (!content || content.trim() === "") return;

  const date = getCurrentDate();
  // prettier-ignore
  const id = await queries.insertBonusComment(bonusId, userId, content, date, refCommentId);
  res.json(id);
});

app.patch(
  "/api/admin/bonus/:bonusId/comment/:commentId",
  isAdminAuth,
  async (req, res) => {
    const { commentId } = req.params;
    const { valuated } = req.body;
    if (valuated !== undefined)
      await queries.updateBonusValuated(commentId, valuated);
    res.json(valuated);
  }
);

app.delete("/api/admin/comment/:commentId", isAdminAuth, async (req, res) => {
  const { commentId } = req.params;
  await queries.deleteComment(commentId);
  res.json(commentId);
});

// presentation comments
app.get(
  "/api/subject/:subjectId/presentation/:presentationId/student/comment",
  isEnrolledInSubjectAuth,
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
  "/api/subject/:subjectId/presentation/:presentationId/teacher/comment",
  isEnrolledInSubjectAuth,
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
  "/api/subject/:subjectId/presentation/:presentationId/teacher/comment",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { presentationId } = req.params;
    const { userId, content, refCommentId } = req.body;
    if (!content || content.trim() === "") return;
    const date = getCurrentDate();
    // prettier-ignore
    const id = await queries.insertPresentationComment(presentationId, userId, content, date, refCommentId, constants.TEACHER);
    res.json(id);
  }
);

app.post(
  "/api/subject/:subjectId/presentation/:presentationId/student/comment",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { presentationId } = req.params;
    const { userId, content, refCommentId } = req.body;
    if (!content || content.trim() === "") return;
    const date = getCurrentDate();
    // prettier-ignore
    const id = await queries.insertPresentationComment(presentationId, userId, content, date, refCommentId, constants.STUDENT);
    res.json(id);
  }
);

app.patch(
  "/api/admin/presentation/:presentationId",
  isAdminAuth,
  async (req, res) => {
    const { presentationId } = req.params;
    const { status } = req.body;
    if (status !== null || status !== undefined)
      await queries.updatePresentationStatus(presentationId, status);
    res.json(status);
  }
);

app.delete(
  "/api/admin/subject/:subjectId/presentation/:presentationId",
  isAdminAuth,
  async (req, res) => {
    const { presentationId, subjectId } = req.params;
    const { path } = req.query;
    const editedPath = `uploads/teacher/${subjectId}/${presentationId}_${path}`;
    await queries.deleteTeacherPresentation(presentationId);
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
  isAdminAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const { criteria } = req.body;
          const { wereJustUpdatedNotDeletedOrInserted } = req.query;

          if (wereJustUpdatedNotDeletedOrInserted == "true") {
            for (const criterion of criteria) {
              await queries.updatePresentationCriteria(
                criterion.id,
                criterion.name,
                criterion.height,
                conn
              );
            }
            conn.commit().then(() => {
              res.json(subjectId);
            });
            conn.release();
          } else {
            await queries.deletePresentationCriteria(subjectId, conn);
            const id = await queries.insertPresentationCriteria(
              subjectId,
              criteria,
              conn
            );
            conn.commit().then(() => {
              res.json(id);
            });
            conn.release();
          }
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

// presentation valuation types
app.get(
  "/api/presentation/valuation-types",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { subjectId } = req.query;
    const rows = await queries.getPresentationValuationTypes(subjectId);
    res.json(rows);
  }
);

// get teacher's presentations
app.get(
  "/api/teacher-presentation",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { userId, subjectId } = req.query;
    const row = await queries.getTeacherPresentations(userId, subjectId);
    res.json(row);
  }
);

// get student's presentations
app.get(
  "/api/student-presentation",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { userId, subjectId, status } = req.query;
    const rows = await queries.getStudentPresentations(
      userId,
      subjectId,
      status
    );
    res.json(rows);
  }
);

// get my presentation - title and points
app.get(
  "/api/subject/:subjectId/my-presentation",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const { userId } = req.query;
    const presentation = await queries.getMyPresentation(userId, subjectId);
    res.json(presentation);
  }
);

app.get(
  "/api/admin/subject/:subjectId/email",
  isAdminAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const rows = await queries.getUserEmailsAndNames(subjectId);
    res.json(rows);
  }
);

// insert evaluation of a presentation that is taken from Sliders form
app.post(
  "/api/subject/:subjectId/presentation/:presentationId/evaluation",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId, presentationId } = req.params;
          const { userWhoEvaluatesId, evaluatedUserId } = req.query;
          const { values } = req.body;

          if (values && values.length > 0) {
            for (const value of values) {
              if (value.value < 0 || value.value > 10) return;
            }
          }

          const whoseUslId = await queries.getUslId(
            subjectId,
            userWhoEvaluatesId,
            conn
          );
          const targetUslId = await queries.getUslId(
            subjectId,
            evaluatedUserId,
            conn
          );

          for (const element of values) {
            const pvpId = await queries.getPvpId(subjectId, element.name, conn);
            await queries.insertPresentationValuation(
              whoseUslId,
              targetUslId,
              pvpId,
              element.value,
              conn
            );
          }

          conn.commit().then(() => {
            res.json(presentationId);
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

// download presentation
app.get(
  "/api/subject/:subjectId/presentation/:presentationId/download",
  isEnrolledInSubjectAuth,
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
  isEnrolledInSubjectAuth,
  upload.single("file"),
  async (req, res, next) => {
    const { subjectId } = req.params;
    const { teacherPres, userId, status } = req.query;
    const file = req.file;
    let presId = null;

    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          if (teacherPres === "true") {
            presId = await queries.insertTeacherPresentation(
              subjectId,
              path.parse(file.filename).name,
              file.filename,
              getCurrentDate(),
              conn
            );
          } else {
            if (parseInt(status) !== constants.STUD_PRES_NEUTRAL) return;
            const oldPres = await queries.getStudentPresentation(
              userId,
              subjectId,
              conn
            );
            if (oldPres) {
              const targetUslId = oldPres.target_usl_id;
              await queries.deleteStudentEvaluation(targetUslId, conn);
              await queries.deleteStudentPresentation(oldPres.id, conn);
              const editedPath = `uploads/${subjectId}/${oldPres.id}_${oldPres.path}`;
              fs.unlink(editedPath, (err) => {
                if (err) {
                  conn.rollback();
                  conn.release();
                  console.error(err);
                  return;
                }
              });
            }
            presId = await queries.insertStudentPresentation(
              path.parse(file.filename).name,
              file.filename,
              parseInt(userId),
              conn
            );
            await queries.updateStudentPresentation(
              presId,
              userId,
              subjectId,
              conn
            );
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
              if (err) {
                conn.rollback();
                conn.release();
                console.error(err);
                return;
              }
            }
          );

          conn.commit().then(() => {
            res.json({ subjectId, userId });
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

app.get(
  "/api/subject/:subjectId/weight",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    pool.getConnection().then((conn) => {
      conn.beginTransaction().then(async () => {
        try {
          const { subjectId } = req.params;
          const presentationWeight = await queries.getPresentationWeight(
            subjectId
          );
          const attendanceWeight = await queries.getAttendanceWeight(subjectId);
          const commentsWeight = await queries.getCommentsWeight(subjectId);

          conn.commit().then(() => {
            res.json({
              presentationWeight,
              attendanceWeight,
              commentsWeight,
            });
          });
          conn.release();
        } catch (error) {
          conn.rollback();
          conn.release();
          console.error(error);
        }
      });
    });
  }
);

// get valuation of a certain subject - finds info about given subject e.g. weight of attendance, bonuses, presentation
app.get(
  "/api/subject/:subjectId/subject-valuation",
  isEnrolledInSubjectAuth,
  async (req, res) => {
    const { subjectId } = req.params;
    const row = await queries.getSubjectValuation(subjectId);
    res.json(row);
  }
);

app.put(
  "/api/admin/subject/:subjectId/subject-valuation",
  isAdminAuth,
  async (req, res) => {
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
  }
);

const isCorrectPassword = (typedPassword, salt, DBpassword) => {
  const password = `${typedPassword}{${salt}}`;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  return hashedPassword === DBpassword;
};

// set port, listen for requests
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

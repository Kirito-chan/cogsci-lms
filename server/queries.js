import pool from "./db.js";
import {
  TEACHER,
  ATTENDANCE_WEIGHT,
  PRESENTATION_WEIGHT,
  COMMENT_WEIGHT,
  PENDING_FOR_SUBJ,
  ACCEPTED_TO_SUBJ,
  STUD_PRES_NEUTRAL,
  A,
  B,
  C,
  D,
  E,
  Fx,
  ATTENDANCE_OPENED,
  MAX_POINT_HEIGHT_PRES_EVALUATION,
  IS_STUDENT,
  SUBJ_IS_ACTIVE,
  NOT_YET_EVALUATED_BONUS_POINTS,
  NOT_YET_COMMENTED,
  GOT_0_BONUS_POINTS,
  ADMIN_FOR_SUBJ,
  IS_ADMIN,
} from "./constants.js";

// subject_id = 15  je predmet KV jazyk a kognicia ked som nanho chodil
// subject_id = 18 je KV mozog a mysel co som chodil naposledy, minuly semester
// user_id = 6 je admin
// user_id = 241 som ja Frantisek Kochjar - Soarsky
// user_id = 346 je user dobry na dochadzku

const execute = async (queryString, paramsArr) => {
  const rows = await pool.promise().query(queryString, paramsArr);
  return rows;
};

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  email,
  salt,
  date
) => {
  const [row] = await execute(
    `INSERT INTO user (first_name, last_name, username, password, email, role, salt, last_visited_announcements)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, username, password, email, IS_STUDENT, salt, date]
  );
  return row.insertId;
};

// BONUSES

// prettier-ignore
export const insertBonus = async (subjectId, title, content, urlRef, created) => {
  const [row] = await execute(
    `INSERT INTO announcement (subject_id, content, title, created, updated, updated_count, video_URL)
     VALUES (?, ?, ?, ?, ?, 0, ?)`,
    [subjectId, content, title, created, created, urlRef]
  );
  return row.insertId;
};

export const getBonusesOfStudent = async (userId, subjectId) => {
  const [rows] = await execute(
    `SELECT a.id, a.created,
         CASE
         WHEN ac.id is NULL THEN ?
          WHEN sum(ac.valuated) is NULL THEN ?
          WHEN sum(ac.valuated) = ? THEN FALSE
          ELSE TRUE
        END AS got_point        
      FROM announcement_comments ac RIGHT JOIN announcement a  
      ON a.id = ac.announcement_id AND ac.user_id = ? AND ac.announcement_comment_id IS NULL
      WHERE a.subject_id = ?
      GROUP BY a.id
      ORDER BY a.id`,
    [
      NOT_YET_COMMENTED,
      NOT_YET_EVALUATED_BONUS_POINTS,
      GOT_0_BONUS_POINTS,
      userId,
      subjectId,
    ]
  );
  return rows;
};

export const getBonusCommentForUser = async (userId, bonusId) => {
  const [rows] = await execute(
    `SELECT id FROM announcement_comments 
     WHERE user_id = ? AND announcement_id = ? AND announcement_comment_id IS NULL
     ORDER BY ISNULL(valuated), valuated DESC
     LIMIT 1
     `,
    [userId, bonusId]
  );
  return rows[0]?.id;
};

export const getBonusComments = async (bonusId) => {
  const [rows] = await execute(
    `SELECT ac.*, ac.announcement_comment_id as ref_comment_id, user.first_name, user.last_name, user.role as user_role
     FROM announcement_comments ac JOIN user ON user.id = ac.user_id WHERE ac.announcement_id = ?`,
    [bonusId]
  );
  return rows;
};
// prettier-ignore
export const insertBonusComment = async (bonusId, userId, content, date, refCommentId) => {
    const [row] = await execute(
      `INSERT INTO announcement_comments (user_id, announcement_id, content, date, announcement_comment_id)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, bonusId, content, date, refCommentId]
    );
    return row.insertId;
};

export const getBonus = async (bonusId) => {
  const [row] = await execute("SELECT * FROM announcement WHERE id = ?", [
    bonusId,
  ]);
  return row[0];
};

export const getBonuses = async (userId, subjectId) => {
  const [rows] = await execute(
    `
  WITH
  tab1 AS (
  SELECT a.*,
         c.user_id,
         CASE
         WHEN c.id is NULL THEN ?
          WHEN sum(c.valuated) is NULL THEN ?
          WHEN sum(c.valuated) = ? THEN '0'
          ELSE '1'
        END AS evaluation,
        count(c.user_id) as num_of_comments         
  FROM announcement AS a LEFT JOIN announcement_comments AS c
  ON a.id = c.announcement_id AND c.user_id = ? AND c.announcement_comment_id IS NULL
  WHERE a.subject_id = ?
  GROUP BY a.id),

  tab2 AS (
    SELECT c.announcement_id as id, 
           count(*) as num_all_comments 
           FROM announcement_comments AS c
           WHERE c.announcement_comment_id IS NULL
    GROUP BY c.announcement_id
  )

  SELECT tab1.*, tab2.num_all_comments
  FROM tab1 LEFT JOIN tab2 USING(id)
  ORDER BY tab1.id DESC`,
    [
      NOT_YET_COMMENTED,
      NOT_YET_EVALUATED_BONUS_POINTS,
      GOT_0_BONUS_POINTS,
      userId,
      subjectId,
      subjectId,
    ]
  );
  return rows;
};

export const updateBonusInfo = async (
  id,
  title,
  content,
  videoURL,
  date,
  isFocusingURL
) => {
  await execute(
    `UPDATE announcement a SET a.title = ?, a.content = ?, a.video_URL = ?, 
                               a.updated = ?, a.updated_count = updated_count + 1,
                               a.is_focusing_URL = ?
     WHERE id = ?`,
    [title, content, videoURL, date, isFocusingURL ? true : false, id]
  );
};

export const updateBonusValuated = async (commentId, valuated) => {
  if (valuated == NOT_YET_EVALUATED_BONUS_POINTS) {
    valuated = null;
  }
  await execute(
    `UPDATE announcement_comments a SET a.valuated = ?
     WHERE id = ?`,
    [valuated, commentId]
  );
};

export const deleteBonus = async (id) => {
  await execute(`DELETE FROM announcement a WHERE a.id = ?`, [id]);
};

export const deleteComment = async (commentId) => {
  await execute(`DELETE FROM announcement_comments WHERE id = ?`, [commentId]);
};

// admin loading students

export const getStudents = async (subjectId, status) => {
  const [rows] = await execute(
    `SELECT u.id, u.first_name, u.last_name, u.username, u.email, u.role, usl.presentation_id, p.status as pres_status FROM 
     (user_subject_lookup usl JOIN user u ON u.id = usl.user_id)
     LEFT JOIN presentation p ON p.id = usl.presentation_id
     WHERE usl.subject_id = ? AND usl.status = ? AND u.role = ?
     ORDER BY u.last_name, u.first_name`,
    [subjectId, status, IS_STUDENT]
  );
  return rows;
};

export const updateUserStatus = async (subjectId, userId, status) => {
  const [row] = await execute(
    `UPDATE user_subject_lookup SET status = ?
     WHERE subject_id = ? AND user_id = ?`,
    [status, subjectId, userId]
  );
  return row.insertId;
};

export const insertNewUserToSubject = async (userId, subjectId) => {
  const [row] = await execute(
    `INSERT INTO user_subject_lookup (user_id, subject_id, status)
     VALUES (?, ?, ?)`,
    [userId, subjectId, PENDING_FOR_SUBJ]
  );
  return row.insertId;
};

export const insertSubject = async (
  name,
  year,
  season,
  about,
  userLimit,
  weeks,
  active
) => {
  const [row] = await execute(
    `INSERT INTO subject (name, year, season, about, user_limit, status, weeks, 
       val_attendance, val_presentation, val_comment)
     VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?, ?)`,
    [
      name,
      year,
      season,
      about,
      userLimit,
      active,
      weeks,
      ATTENDANCE_WEIGHT,
      PRESENTATION_WEIGHT,
      COMMENT_WEIGHT,
    ]
  );
  return row.insertId;
};

export const insertSubjectValuation = async (subjectId) => {
  const [row] = await execute(
    `INSERT INTO subject_valuation (subject_id, A, B, C, D, E, Fx)
     VALUES (?, ?, ?, ?, ?,  ?, ?)`,
    [subjectId, A, B, C, D, E, Fx]
  );
  return row.insertId;
};

// ORDER BY (usl.status = ?) DESC, (usl.status = ?) DESC, s.year DESC
//   - znamena, ze najprv to usortuje podla predmetov, do ktorych bol prijaty (kedze usl.status = ACCEPTED_TO_SUBJ ) DESC
//            znamena ze najpr tie ktora maju status = accepted lebo tie su TRUE a DESC usporiada najprv TRUE a az potom FALSE hodnoty, kedze 1 > 0

export const getStudentSubjects = async (userId) => {
  const [rows] = await execute(
    `SELECT s.id, s.name, s.year, s.season, s.about, usl.status,
            CASE WHEN usl.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_enrolled
      FROM user_subject_lookup usl RIGHT JOIN subject s ON
           usl.user_id = ? AND usl.subject_id = s.id
           WHERE s.status = ?
           ORDER BY (usl.status = ?) DESC, (usl.status = ?) DESC, s.year DESC
     `,
    [userId, SUBJ_IS_ACTIVE, ACCEPTED_TO_SUBJ, PENDING_FOR_SUBJ]
  );
  return rows;
};

export const getAllSubjects = async () => {
  const [rows] = await execute(
    `SELECT s.*, count(DISTINCT CASE WHEN u.role = ? THEN usl.user_id END) as count_students
     FROM subject s LEFT JOIN (user_subject_lookup usl JOIN user u ON u.id = usl.user_id) 
     ON usl.subject_id = s.id AND usl.user_id IS NOT NULL AND usl.status = ?
     GROUP BY s.id
     ORDER BY s.status, s.year DESC`,
    [IS_STUDENT, ACCEPTED_TO_SUBJ]
  );
  return rows;
};

export const getSubject = async (subjectId) => {
  const [row] = await execute("SELECT * FROM subject WHERE id = ?", [
    subjectId,
  ]);
  return row[0];
};

export const updateSubject = async (
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
) => {
  await execute(
    `UPDATE subject SET name = ?, year = ?, season = ?, about = ?, user_limit = ?,
    weeks = ?, status = ?, val_presentation = ?, val_attendance = ?, val_comment = ?
    WHERE id = ?`,
    [
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
      subjectId,
    ]
  );
};

export const updateSubjectStatus = async (subjectId, status) => {
  await execute("UPDATE subject s SET s.status = ? WHERE id = ?", [
    status,
    subjectId,
  ]);
};

export const getSubjectsWhereUserIsNotIn = async (userId) => {
  const [rows] = await execute(
    `
  SELECT DISTINCT usl.subject_id as id FROM user u JOIN user_subject_lookup usl 
  WHERE ? NOT IN (SELECT user_id FROM user_subject_lookup usl2 WHERE usl2.subject_id = usl.subject_id)
  `,
    [userId]
  );
  return rows;
};

export const getSubjectValuation = async (subjectId) => {
  const [
    row,
  ] = await execute("SELECT * FROM subject_valuation WHERE subject_id = ?", [
    subjectId,
  ]);
  return row[0];
};

export const updateSubjectValuation = async (
  subjectId,
  gradeA,
  gradeB,
  gradeC,
  gradeD,
  gradeE,
  gradeFx
) => {
  await execute(
    `UPDATE subject_valuation s SET s.A = ?, s.B = ?, s.C = ?, s.D = ?, s.E = ?, s.Fx = ? 
     WHERE subject_id = ?`,
    [gradeA, gradeB, gradeC, gradeD, gradeE, gradeFx, subjectId]
  );
};

export const updateUserRole = async (userId, role) => {
  await execute("UPDATE user SET role = ? WHERE id = ?", [role, userId]);
};

export const getStudentsBySubjectId = async (subjectId) => {
  const [rows] = await execute(
    `SELECT u.id, u.first_name, u.last_name FROM 
     user_subject_lookup usl JOIN user u ON u.id = usl.user_id
     WHERE usl.subject_id = ? AND u.role = ?
     ORDER BY u.last_name, u.first_name`,
    [subjectId, IS_STUDENT]
  );
  return rows;
};

export const getAttendancesOfStudent = async (userId, subjectId) => {
  const [rows] = await execute(
    `SELECT a.id, a.date, CASE WHEN ual.user_id IS NULL THEN FALSE ELSE TRUE END as got_point
     FROM user_attendance_lookup ual RIGHT JOIN attendance a ON a.id = ual.attendance_id AND ual.user_id = ?
     WHERE a.subject_id = ?
     ORDER BY a.id`,
    [userId, subjectId]
  );
  return rows;
};

export const userHasAttendance = async (userId, attendanceId) => {
  const [rows] = await execute(
    `SELECT * FROM user_attendance_lookup ual
     WHERE user_id = ? AND attendance_id = ? `,
    [userId, attendanceId]
  );
  return rows.length > 0;
};

export const updateAttendancesOfStudent = async (userId, subjectId) => {
  const [rows] = await execute(`UPDATE attendance SET `, [userId, subjectId]);
  return rows;
};

export const getUsers = async (username) => {
  const [
    rows,
  ] = await execute(
    "SELECT * FROM user ORDER BY role DESC, last_name, first_name",
    [username]
  );
  return rows;
};

export const getUserByIdAndSubjectId = async (userId, subjectId) => {
  const [row] = await execute(
    `SELECT u.id, u.first_name, u.last_name, u.email, u.username, usl.presentation_id, p.status as pres_status 
     FROM (user_subject_lookup usl JOIN user u ON u.id = usl.user_id)
     LEFT JOIN presentation p ON p.id = usl.presentation_id
     WHERE u.id = ? AND usl.subject_id = ?`,
    [userId, subjectId]
  );
  return row[0];
};

export const getUserByUsername = async (username) => {
  const [row] = await execute("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return row[0];
};

export const getAttendedCoursesOfUser = async (userId) => {
  const [rows] = await execute(
    `SELECT usl.subject_id as id 
     FROM user_subject_lookup usl JOIN subject s ON usl.subject_id = s.id
     WHERE usl.user_id = ? AND usl.subject_id IS NOT NULL AND usl.status = ? AND s.status = ?`,
    [userId, ACCEPTED_TO_SUBJ, SUBJ_IS_ACTIVE]
  );
  return rows;
};

export const getUserByEmail = async (email) => {
  const [row] = await execute("SELECT id, email FROM user WHERE email = ?", [
    email,
  ]);
  return row[0];
};

export const updateUserResetPassword = async (token, expires, id) => {
  await execute(
    "UPDATE user SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?",
    [token, expires, id]
  );
};

export const updateUser = async (
  id,
  firstName,
  lastName,
  username,
  email,
  password,
  salt
) => {
  let array = [firstName, lastName, username, email, password, salt, id];
  let sql = `UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ?, password = ?, salt = ? WHERE id = ?`;
  if (!password) {
    sql = `UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ? WHERE id = ?`;
    array = [firstName, lastName, username, email, id];
  }

  const [row] = await execute(sql, array);
  return row[0];
};

export const getUserById = async (id) => {
  const [row] = await execute("SELECT * FROM user WHERE id = ?", [id]);
  return row[0];
};

export const checkUserResetPasswordToken = async (
  userId,
  hashedToken,
  currentDate
) => {
  const [row] = await execute(
    `
  SELECT username, first_name, last_name 
  FROM user 
  WHERE id = ? AND reset_password_token = ? AND reset_password_expires >= ? `,
    [userId, hashedToken, currentDate]
  );
  return row[0];
};

export const updateUserPasswordAndTokens = async (
  userId,
  password,
  salt,
  currentDate
) => {
  const [row] = await execute(
    `
  UPDATE user SET password = ?, salt = ?, reset_password_token = '', reset_password_expires = ? 
  WHERE id = ?`,
    [password, salt, currentDate, userId]
  );
  return row[0];
};

// attendance
export const getAttendanceAndUser = async (userId, subjectId) => {
  const [row] = await execute(
    `
  WITH
  tab1 AS (
  SELECT a.date, 
         a.id as attendance_id,
         u.id,
         a.status,
         CASE
           WHEN u.id IS NULL THEN 0
           ELSE 1
         END AS got_point,
         CASE
          WHEN u.id is NULL AND a.status = ? THEN 1
          ELSE 0
        END AS show_password_input 
  FROM attendance AS a LEFT JOIN user_attendance_lookup AS u
  ON u.attendance_id = a.id AND u.user_id = ?
  WHERE a.subject_id = ?),

  pres_weight as (
    SELECT val_attendance as weight FROM subject s WHERE s.id = ?
   )

  SELECT tab1.date, tab1.id, tab1.got_point, tab1.show_password_input, pw.weight 
  FROM tab1 CROSS JOIN pres_weight pw
  ORDER BY tab1.attendance_id DESC`,
    [ATTENDANCE_OPENED, userId, subjectId, subjectId]
  );
  return row;
};

export const getAttendance = async (subjectId) => {
  const [rows] = await execute(
    `SELECT * FROM attendance WHERE subject_id = ?
     ORDER BY id DESC`,
    [subjectId]
  );
  return rows;
};

export const getAttendanceIdForPassword = async (subjectId, password) => {
  const [
    rows,
  ] = await execute(
    `SELECT id FROM attendance WHERE subject_id = ? AND password like binary ? AND status = ?`,
    [subjectId, password, ATTENDANCE_OPENED]
  );

  if (rows.length > 0) return rows[0].id;
  else return false;
};

export const insertAttendanceForUser = async (userId, attendanceId) => {
  const [
    row,
  ] = await execute(
    `INSERT INTO user_attendance_lookup (user_id, attendance_id) VALUES (?, ?)`,
    [userId, attendanceId]
  );
  return row.insertId;
};

export const deleteAttendanceForUser = async (userId, attendanceId) => {
  await execute(
    `DELETE FROM user_attendance_lookup WHERE user_id = ? AND attendance_id = ?`,
    [userId, attendanceId]
  );
};

export const insertAttendance = async (subjectId, date, password) => {
  const [
    row,
  ] = await execute(
    `INSERT INTO attendance (subject_id, date, password, status) VALUES (?, ?, ?, ?)`,
    [subjectId, date, password, ATTENDANCE_OPENED]
  );
  return row.insertId;
};

export const updateAttendanceStatus = async (id, status) => {
  const [rows] = await execute(
    `UPDATE attendance SET status = ? WHERE id = ?`,
    [status, id]
  );
  return rows;
};

// presentation comments
export const getPresentationComments = async (
  presentationId,
  whoseComments
) => {
  let whoseTable = "user_presentation_comments";
  if (whoseComments === TEACHER) {
    whoseTable = "teacher_presentation_comments";
  }

  const [rows] = await execute(
    `SELECT upc.*, upc.presentation_comment_id as ref_comment_id, user.first_name, user.last_name, user.role as user_role 
     FROM ${whoseTable} upc JOIN user ON user.id = upc.user_id WHERE upc.presentation_id = ?`,
    [presentationId]
  );
  return rows;
};

export const insertPresentationComment = async (
  presentationId,
  userId,
  content,
  date,
  refCommentId,
  whose
) => {
  let whoseTable = "user_presentation_comments";
  if (whose === TEACHER) {
    whoseTable = "teacher_presentation_comments";
  }

  const [row] = await execute(
    `INSERT INTO ${whoseTable} (user_id, presentation_id, content, date, presentation_comment_id)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, presentationId, content, date, refCommentId]
  );
  return row.insertId;
};

export const getUserEmailsAndNames = async (subjectId) => {
  const [rows] = await execute(
    `SELECT u.id, u.first_name, u.last_name, u.email FROM user u JOIN user_subject_lookup usl 
         ON u.id = usl.user_id AND usl.subject_id = ? AND usl.status = ? 
         WHERE u.role = ?
         ORDER BY u.first_name, u.last_name `,
    [subjectId, ACCEPTED_TO_SUBJ, IS_STUDENT]
  );
  return rows;
};

// presentation valuation types
export const getPresentationValuationTypes = async (subjectId) => {
  const [
    rows,
  ] = await execute(
    `SELECT * FROM presentation_valuation_point pvp WHERE pvp.subject_id = ?`,
    [subjectId]
  );
  return rows;
};

export const getUslId = async (subjectId, userId) => {
  const [
    row,
  ] = await execute(
    `SELECT id FROM user_subject_lookup WHERE subject_id = ? AND user_id = ?`,
    [subjectId, userId]
  );
  return row[0].id;
};

export const getPvpId = async (subjectId, name) => {
  const [
    row,
  ] = await execute(
    `SELECT id FROM presentation_valuation_point WHERE subject_id = ? AND point = ?`,
    [subjectId, name]
  );
  return row[0].id;
};

export const insertPresentationValuation = async (
  whoseUslId,
  targetUslId,
  pvpId,
  points
) => {
  const [
    row,
  ] = await execute(
    `INSERT INTO user_presentation_valuation (whose_usl_id, target_usl_id, pvp_id, points) VALUES(?, ?, ?, ?)`,
    [whoseUslId, targetUslId, pvpId, points]
  );
  return row.insertId;
};

// presentations

export const deletePresentationCriteria = async (subjectId) => {
  await execute(
    `DELETE FROM presentation_valuation_point WHERE subject_id = ?`,
    [subjectId]
  );
};

export const updatePresentationCriteria = async (id, name, height) => {
  await execute(
    `UPDATE presentation_valuation_point SET point = ?, height = ? WHERE id = ?`,
    [name, height, id]
  );
};

export const insertPresentationCriteria = async (subjectId, criteria) => {
  let query =
    "INSERT INTO presentation_valuation_point (subject_id, point, height) VALUES ";
  for (let index = 0; index < criteria.length; index++) {
    const criterion = criteria[index];
    if (index !== criteria.length - 1) {
      query += `(${subjectId}, '${criterion.name}', ${criterion.height}), `;
    } else query += `(${subjectId}, '${criterion.name}', ${criterion.height})`;
  }
  const [row] = await execute(query, [subjectId]);
  return row.insertId;
};

export const deleteTeacherPresentation = async (id) => {
  await execute(`DELETE FROM teacher_presentation t WHERE t.id = ?`, [id]);
};

export const getStudentPresentations = async (
  userId,
  subjectId,
  statusIsOpen
) => {
  const [row] = await execute(
    `
  WITH
   tab1 as 
   (SELECT p.id, p.title, p.owner_id as user_id, p.path, p.status, user.first_name, user.last_name,
           count(u.user_id) as num_all_comments   
   FROM ((presentation p JOIN user_subject_lookup as usl
       ON p.id = usl.presentation_id)
       JOIN user ON user.id = usl.user_id)
   LEFT JOIN user_presentation_comments AS u ON
       u.presentation_id = p.id
   WHERE p.status = ? AND usl.subject_id = ?
   GROUP BY p.id),

   tab2 as (
   SELECT tab1.*, count(u.user_id) as num_of_comments 
   FROM tab1 LEFT JOIN user_presentation_comments AS u
         ON tab1.id = u.presentation_id AND u.user_id = ?
   GROUP BY tab1.id
   )

   SELECT tab2.*, CASE WHEN upv.id is NULL THEN FALSE ELSE TRUE END AS has_evaluated
   FROM tab2 LEFT JOIN user_presentation_valuation as upv
         ON upv.target_usl_id = (SELECT usl.id FROM user_subject_lookup as usl
                                WHERE usl.user_id = tab2.user_id
                                  AND usl.subject_id = ?)
         AND upv.whose_usl_id=(SELECT usl.id FROM user_subject_lookup as usl
                               WHERE usl.user_id = ?
                                 AND usl.subject_id = ?) 
   GROUP BY tab2.id 
   ORDER BY has_evaluated ASC`,
    [statusIsOpen, subjectId, userId, subjectId, userId, subjectId]
  );
  return row;
};

export const updatePresentationStatus = async (id, status) => {
  await execute(
    `UPDATE presentation p SET p.status = ?
     WHERE id = ?`,
    [status, id]
  );
};

export const getPresentationWeight = async (subjectId) => {
  const [row] = await execute(
    `
      SELECT val_presentation as weight FROM subject s WHERE s.id = ?
    `,
    [subjectId]
  );
  return row[0];
};

export const getAttendanceWeight = async (subjectId) => {
  const [row] = await execute(
    `
      SELECT val_attendance as weight FROM subject s WHERE s.id = ?
    `,
    [subjectId]
  );
  return row[0];
};

export const getCommentsWeight = async (subjectId) => {
  const [row] = await execute(
    `
      SELECT val_comment as weight FROM subject s WHERE s.id = ?
    `,
    [subjectId]
  );
  return row[0];
};

export const getMyPresentation = async (userId, subjectId) => {
  const [row] = await execute(
    `
  WITH
    tab1 as (
      SELECT usl.id as usl_id, usl.presentation_id, usl.user_id, p.title, p.path, p.status
      FROM user_subject_lookup as usl JOIN presentation p
            ON p.id = usl.presentation_id
      WHERE usl.user_id = ? AND usl.subject_id = ?
    ),

    tab2 as (
      SELECT tab1.*, upv.pvp_id, upv.points, upv.target_usl_id, upv.whose_usl_id
      FROM tab1 LEFT JOIN user_presentation_valuation upv
      ON tab1.usl_id = upv.target_usl_id
    ),

    pres_weight as (
      SELECT val_presentation as weight FROM subject s WHERE s.id = ?
     ),

    tab3 as (
      SELECT tab2.*, ((SELECT weight FROM pres_weight)*(pvp.height/100))/?*tab2.points as points_per_category
      FROM tab2 LEFT JOIN presentation_valuation_point as pvp
      ON tab2.pvp_id = pvp.id
    ),

    tab4 as (SELECT presentation_id as id, 
           title, 
           user_id,
           path,
           status,
           ROUND(sum(points_per_category)/(SELECT count(DISTINCT whose_usl_id) FROM tab2), 2) as points
    FROM tab3)

    SELECT tab4.*, user.first_name, user.last_name 
    FROM tab4 JOIN user ON tab4.user_id = user.id 
    WHERE tab4.id is not null;
  `,
    [userId, subjectId, subjectId, MAX_POINT_HEIGHT_PRES_EVALUATION]
  );
  return row[0];
};

export const getTeacherPresentations = async (userId, subjectId) => {
  const [row] = await execute(
    `WITH
  tab1 AS (
  SELECT t.id, 
         t.title,
         t.path,
         c.user_id,
         count(c.user_id) as num_of_comments         
  FROM teacher_presentation AS t LEFT JOIN teacher_presentation_comments AS c
  ON t.id = c.presentation_id AND c.user_id = ?
  WHERE t.subject_id = ?
  GROUP BY t.id),

  tab2 AS (
    SELECT c.presentation_id as id, 
           count(*) as num_all_comments
    FROM teacher_presentation_comments AS c
    GROUP BY c.presentation_id
  )

  SELECT tab1.*, tab2.num_all_comments FROM tab1 LEFT JOIN tab2 USING(id)
  ORDER BY tab1.id DESC;`,
    [userId, subjectId]
  );
  return row;
};

export const getAllTeachers = async () => {
  const [rows] = await execute(`SELECT * FROM user WHERE role = ?`, [IS_ADMIN]);
  return rows;
};

export const getAllTeachersIds = async () => {
  const [rows] = await execute(`SELECT id FROM user WHERE role = ?`, [
    IS_ADMIN,
  ]);
  return rows;
};

// aby mohli aj oni hodnotit prezentacie druhych studentov zo svojich uctov
export const insertTeacherToUSL = async (teacherId, subjectId) => {
  const [row] = await execute(
    `INSERT INTO user_subject_lookup (user_id, subject_id, status) 
    VALUES(?, ?, ?)`,
    [teacherId, subjectId, ADMIN_FOR_SUBJ]
  );
  return row.insertId;
};

export const insertTeacherPresentation = async (
  subjectId,
  title,
  path,
  date
) => {
  const [row] = await execute(
    `INSERT INTO teacher_presentation (subject_id, title, path, date) 
    VALUES(?, ?, ?, ?)`,
    [subjectId, title, path, date]
  );
  return row.insertId;
};

export const getStudentPresentation = async (userId, subjectId) => {
  const [row] = await execute(
    `SELECT p.id, p.path, usl.id as target_usl_id FROM user_subject_lookup usl JOIN presentation p ON p.id = usl.presentation_id 
     WHERE usl.user_id = ? AND usl.subject_id = ?`,
    [userId, subjectId]
  );
  return row[0];
};

export const insertStudentPresentation = async (title, path, ownerId) => {
  const [row] = await execute(
    `INSERT INTO presentation (title, path, status, owner_id) 
    VALUES(?, ?, ?, ?)`,
    [title, path, STUD_PRES_NEUTRAL, ownerId]
  );
  return row.insertId;
};

export const updateStudentPresentation = async (presId, userId, subjectId) => {
  await execute(
    `UPDATE user_subject_lookup SET presentation_id = ?
     WHERE user_id = ? AND subject_id = ?`,
    [presId, userId, subjectId]
  );
};

export const deleteStudentPresentation = async (presId) => {
  await execute(`DELETE FROM presentation WHERE id = ?`, [presId]);
};

export const deleteStudentEvaluation = async (targetUslId) => {
  await execute(
    `DELETE FROM user_presentation_valuation WHERE target_usl_id = ?`,
    [targetUslId]
  );
};

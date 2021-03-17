import pool from "./db.js";

// subject_id = 15  je predmet KV jazyk a kognicia ked som nanho chodil
// subject_id = 18 je KV mozog a mysel co som chodil naposledy, minuly semester
// user_id = 6 je admin
// user_id = 241 som ja Frantisek Kochjar - Soarsky
// user_id = 346 je user dobry na dochadzku

const execute = async (queryString, paramsArr) => {
  const rows = await pool.promise().query(queryString, paramsArr);
  return rows;
};

export const getStudentSubjects = async (userId) => {
  const [rows] = await execute(
    `SELECT s.id, s.name, s.year, s.season, s.about, 
            CASE WHEN usl.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_enrolled
      FROM subject s LEFT JOIN user_subject_lookup usl ON
           usl.user_id = ? AND s.id = usl.subject_id
           WHERE s.status = 1
           ORDER BY is_enrolled DESC
     `,
    [userId]
  );
  return rows;
};

export const getAllSubjects = async () => {
  const [rows] = await execute(
    `SELECT s.*, count(DISTINCT usl.user_id) as count_students
     FROM subject s LEFT JOIN user_subject_lookup usl ON usl.subject_id = s.id AND usl.user_id is not NULL AND usl.status = 2
     GROUP BY s.id
     ORDER BY s.status, s.year DESC`,
    []
  );
  return rows;
};

export const getSubject = async (subjectId) => {
  const [row] = await execute("SELECT * FROM subject WHERE id = ?", [
    subjectId,
  ]);
  return row[0];
};

export const getSubjectValuation = async (subjectId) => {
  const [
    row,
  ] = await execute("SELECT * FROM subject_valuation WHERE subject_id = ?", [
    subjectId,
  ]);
  return row[0];
};

export const getUser = async (username) => {
  const [row] = await execute("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return row[0];
};

// attendance
export const getAttedance = async (userId, subjectId) => {
  const [row] = await execute(
    `
  WITH
  tab1 AS (
  SELECT a.date, 
         u.id,
         a.status,
         CASE
           WHEN u.id IS NULL THEN 0
           ELSE 1
         END AS got_point,
         CASE
          WHEN u.id is NULL AND a.status = 2 THEN 1
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
  ORDER BY tab1.date DESC`,
    [userId, subjectId, subjectId]
  );
  return row;
};

// bonus comments
export const getBonusComments = async (bonusId) => {
  const [rows] = await execute(
    `SELECT ac.*, user.first_name, user.last_name, user.role as user_role
     FROM announcement_comments ac JOIN user ON user.id = ac.user_id WHERE ac.announcement_id = ?`,
    [bonusId]
  );
  return rows;
};

// bonus comments
export const getPresentationComments = async (presentationId) => {
  const [rows] = await execute(
    `SELECT upc.*, user.first_name, user.last_name, user.role as user_role
     FROM user_presentation_comments upc JOIN user ON user.id = upc.user_id WHERE upc.presentation_id = ?`,
    [presentationId]
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

// bonuses

export const getBonus = async (bonusId) => {
  const [row] = await execute("SELECT * FROM announcement WHERE id = ?", [
    bonusId,
  ]);
  return row[0];
};

export const getBonuses = async (userId, subjectId) => {
  const [row] = await execute(
    `
  WITH
  tab1 AS (
  SELECT a.*,
         c.user_id,
         CASE
          WHEN sum(c.valuated) is NULL THEN 'nehodnotené'
          WHEN sum(c.valuated) = 0 THEN '0'
          ELSE '1'
        END AS evaluation,
        count(c.user_id) as num_of_comments         
  FROM announcement AS a LEFT JOIN announcement_comments AS c
  ON a.id = c.announcement_id AND c.user_id = ?
  WHERE a.subject_id = ?
  GROUP BY a.id),

  tab2 AS (
    SELECT c.announcement_id as id, 
           count(*) as num_all_comments 
           FROM announcement_comments AS c
    GROUP BY c.announcement_id
  ),

  pres_weight as (
    SELECT val_comment as weight FROM subject s WHERE s.id = ?
   )

  SELECT tab1.*, tab2.num_all_comments, pw.weight
  FROM (tab1 LEFT JOIN tab2 USING(id)) CROSS JOIN pres_weight pw
  ORDER BY tab2.id DESC`,
    [userId, subjectId, subjectId]
  );
  return row;
};

export const updateBonusInfo = async (id, title, content, videoURL, date) => {
  await execute(
    `UPDATE announcement a SET a.title = ?, a.content = ?, a.video_URL = ?, 
                               a.updated = ?, a.updated_count = updated_count + 1
     WHERE id = ?`,
    [title, content, videoURL, date, id]
  );
};

export const deleteBonus = async (id) => {
  await execute(`DELETE FROM announcement a WHERE a.id = ?`, [id]);
};

// presentations

export const getStudentPresentations = async (
  userId,
  subjectId,
  statusOpen
) => {
  const [row] = await execute(
    `
  WITH
   tab1 as 
   (SELECT p.id, p.title, p.owner_id as user_id, p.path, user.first_name, user.last_name,
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
                                WHERE usl.user_id = ?
                                  AND usl.subject_id = ?)
         AND upv.whose_usl_id=(SELECT usl.id FROM user_subject_lookup as usl
                               WHERE usl.user_id = tab2.user_id
                                 AND usl.subject_id = ?) 
   GROUP BY tab2.id 
   ORDER BY has_evaluated ASC`,
    [statusOpen, subjectId, userId, userId, subjectId, subjectId]
  );
  return row;
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

export const getMyPresentation = async (userId, subjectId) => {
  const [row] = await execute(
    `
  WITH
    tab1 as (
      SELECT usl.id as usl_id, usl.presentation_id, usl.user_id, p.title, p.path
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
      SELECT tab2.*, ((SELECT weight FROM pres_weight)*(pvp.height/100))/10*tab2.points as points_per_category
      FROM tab2 LEFT JOIN presentation_valuation_point as pvp
      ON tab2.pvp_id = pvp.id
    ),

    tab4 as (SELECT presentation_id as id, 
           title, 
           user_id,
           path,
           ROUND(sum(points_per_category)/(SELECT count(DISTINCT whose_usl_id) FROM tab2), 2) as points
    FROM tab3)

    SELECT tab4.*, user.first_name, user.last_name 
    FROM tab4 JOIN user ON tab4.user_id = user.id 
    WHERE tab4.id is not null;
  `,
    [userId, subjectId, subjectId]
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
export const insertPresentation = async (title, path, status, ownerId) => {
  const [row] = await execute(
    `INSERT INTO presentation (title, path, status, owner_id) 
    VALUES(?, ?, ?, ?)`,
    [title, path, status, ownerId]
  );
  return row.insertId;
};

export const updatePresentation = async (presId, userId, subjectId) => {
  await execute(
    `UPDATE user_subject_lookup SET presentation_id = ?
     WHERE user_id = ? AND subject_id = ?`,
    [presId, userId, subjectId]
  );
};

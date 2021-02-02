const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// subject_id = 15  je predmet KV jazyk a kognicia ked som nanho chodil
// subject_id = 18 je KV mozog a mysel co som chodil naposledy, minuly semester
// user_id = 6 je admin
// user_id = 241 som ja Frantisek Kochjar - Soarsky
// user_id = 346 je user dobry na dochadzku

// get attendance
app.get("/api/attendance/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
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
      ON u.attendance_id = a.id AND u.user_id = ${userId}
      WHERE a.subject_id = 18)

      SELECT tab1.date, tab1.id, tab1.got_point, tab1.show_password_input FROM tab1
      ORDER BY tab1.date DESC`;

  pool.execute(query, function (err, rows) {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(rows));
    res.json(rows);
  });
});

// get homeworks
app.get("/api/homeworks/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
      WITH
      tab1 AS (
      SELECT a.id, 
             a.title,
             c.user_id,
             CASE
              WHEN sum(c.valuated) is NULL THEN 'nehodnotené'
              WHEN sum(c.valuated) = 0 THEN '0'
              ELSE '1'
            END AS evaluation,
            count(c.user_id) as num_of_comments         
      FROM announcement AS a LEFT JOIN announcement_comments AS c
      ON a.id = c.announcement_id AND c.user_id = ${userId}
      WHERE a.subject_id = 18
      GROUP BY a.id),

      tab2 AS (
        SELECT c.announcement_id as id, 
               count(*) as num_all_comments 
               FROM announcement_comments AS c
        GROUP BY c.announcement_id
      )

      SELECT tab1.*, tab2.num_all_comments FROM tab1 LEFT JOIN tab2 USING(id)
      ORDER BY tab2.id DESC`;

  pool.execute(query, function (err, rows) {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(rows));
    res.json(rows);
  });
});

// get teacher's presentations
app.get("/api/teacher-presentations/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
  WITH
  tab1 AS (
  SELECT t.id, 
         t.title,
         c.user_id,
         count(c.user_id) as num_of_comments         
  FROM teacher_presentation AS t LEFT JOIN teacher_presentation_comments AS c
  ON t.id = c.presentation_id AND c.user_id = 241
  WHERE t.subject_id = 14
  GROUP BY t.id),

  tab2 AS (
    SELECT c.presentation_id as id, 
           count(*) as num_all_comments
    FROM teacher_presentation_comments AS c
    GROUP BY c.presentation_id
  )

  SELECT tab1.*, tab2.num_all_comments FROM tab1 LEFT JOIN tab2 USING(id)
  ORDER BY tab1.id DESC;`;

  pool.execute(query, function (err, rows) {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(rows));
    res.json(rows);
  });
});

// get student's presentations
app.get("/api/student-presentations/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
  WITH
  tab1 AS (
  SELECT t.id, 
         t.title,
         c.user_id,
         count(c.user_id) as num_of_comments,
                  
  FROM user_presentation AS t LEFT JOIN user_presentation_comments AS c
  ON t.id = c.presentation_id AND c.user_id = 241
  WHERE t.subject_id = 14
  GROUP BY t.id),

  tab2 AS (
    SELECT c.presentation_id as id, 
           count(*) as num_all_comments
    FROM user_presentation_comments AS c
    GROUP BY c.presentation_id
  )

  SELECT tab1.*, tab2.num_all_comments FROM tab1 LEFT JOIN tab2 USING(id)
  ORDER BY tab1.id DESC;`;

  pool.execute(query, function (err, rows) {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(rows));
    res.json(rows);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

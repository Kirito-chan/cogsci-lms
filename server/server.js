const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/api/attendance/:userId", (req, res) => {
  console.log("ferko")
  const {userId} = req.params
   const query = `
      WITH
      tab1 AS (
      SELECT a.date, 
             u.id,
             CASE
               WHEN u.id IS NULL THEN 0
               ELSE 1
             END AS got_point 
      FROM attendance AS a LEFT JOIN user_attendance_lookup AS u
      ON u.attendance_id = a.id AND u.user_id = ${userId}
      WHERE a.subject_id = 18)

      SELECT tab1.date, tab1.id, tab1.got_point FROM tab1
      ORDER BY tab1.date ASC`

      // subject_id = 15  je predmet KV jazyk a kognicia ked som nanho chodil ... subject_id = 18 je KV mozog a mysel co som chodil
      // user_id = 241 som ja Frantisek Kochjar - Soarsky
    
// "SELECT * FROM user WHERE user.username = 'soarsky'"
   pool.execute(query, function (err, rows) {
       if (err) throw err;
        rows = JSON.parse(JSON.stringify(rows));
        res.json(rows);
    }) 
    
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
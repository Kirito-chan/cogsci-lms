// config db ====================================
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 50,
});

export default pool;

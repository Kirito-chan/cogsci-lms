// config db ====================================
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysql305',
    port: '5001',
    database: 'prezentacie_db'
  });

  module.exports = pool;
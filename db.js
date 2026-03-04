require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL successfully!2');
    connection.release();
    return { success: true };
  } catch (error) {
    console.error('❌ MySQL Connection failed:', error.message);
    return { success: false, error: error.message };
  }
}

checkConnection();

module.exports = { pool, checkConnection };

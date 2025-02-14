// config/db.js
const mysql = require("mysql2/promise");

// Create a connection pool to reuse connections
const pool = mysql.createPool({
  host: "localhost",       // Typically 'localhost' for XAMPP
  user: "root",            // Default XAMPP user (adjust if needed)
  password: "",            // Default XAMPP password (often empty)
  database: "test_db",  // Replace with your DB name
});

module.exports = pool;

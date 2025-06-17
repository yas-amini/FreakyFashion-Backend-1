// =============================================
// 1. REQUIRED DEPENDENCIES
// =============================================

// SQLite3 with verbose mode for detailed logging
const sqlite3 = require("sqlite3").verbose();
// Node's path module for cross-platform file paths
const path = require("path");

// =============================================
// 2. DATABASE CONFIGURATION
// =============================================

// Create database connection to product-database.db
const db = new sqlite3.Database(
  path.join(__dirname, "../data/product-database.db"),
  //If there's an error connecting to the database, print an error message. If not, log that the connection was successful
  (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

// =============================================
// 3. EXPORT
// =============================================

// Export database connection for use in other files
module.exports = db;

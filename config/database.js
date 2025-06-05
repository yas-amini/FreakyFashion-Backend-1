const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../data/product-database.db"),
  (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

module.exports = db;

// A config file that sets up and exports the connection to your database.

// Import the SQLite3 library so we can use SQLite in this project. Turn on extra logging and debugging info with verbose
const sqlite3 = require("sqlite3").verbose();
// Import Node's built-in path module — it helps build file paths in a way that works on any operating system
const path = require("path");
//"Create a new connection to a database file called product-database.db, which is located in the data folder above this file.
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

module.exports = db;

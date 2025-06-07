// Package for creating HTTP errors (like 404, 500, etc.)
var createError = require("http-errors");

// The main Express framework package
var express = require("express");

// Node.js built-in package for handling file paths
var path = require("path");

// Package for parsing cookies from requests
var cookieParser = require("cookie-parser");

// Package for logging HTTP requests (for debugging)
var logger = require("morgan");

// Package for using layouts with EJS templates
var expressLayouts = require("express-ejs-layouts");

// Import the main routes (homepage, products, etc.)
var indexRouter = require("./routes/index");

// Import the user-related routes
var usersRouter = require("./routes/users");

// Import the admin routes
var adminRouter = require("./routes/admin");

// Create the Express application instance
var app = express();

// Tell Express where to find the view templates
app.set("views", path.join(__dirname, "views"));

// Set EJS as the template engine for rendering views
app.set("view engine", "ejs");

// Enable the layout system
app.use(expressLayouts);

// Set the default layout file to use
app.set("layout", "layout");

// Enable request logging in development mode
app.use(logger("dev"));

// Enable parsing of JSON request bodies
app.use(express.json());

// Enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Enable cookie parsing
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Mount the main routes at the root URL
app.use("/", indexRouter);

// Mount the user routes at /users
app.use("/users", usersRouter);

// Mount the admin routes at /admin
app.use("/admin", adminRouter);

// Handle 404 errors - if no route matches, create a 404 error
app.use(function (req, res, next) {
  next(createError(404));
});

// Global error handler - handles all errors in the application
app.use(function (err, req, res, next) {
  // Set error message for the view
  res.locals.message = err.message;

  // Only show detailed errors in development mode
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Set the HTTP status code (default to 500 if not set)
  res.status(err.status || 500);

  // Render the error page
  res.render("error");
});

// Export the configured Express application
module.exports = app;

// =============================================
// 1. REQUIRED DEPENDENCIES
// =============================================

// Import a package for creating HTTP errors (like 404, 500, etc.)
var createError = require("http-errors");

// Import Express so we can build the web server
var express = require("express");

// Import the built-in Node module for handling file paths
var path = require("path");

// Import a tool that lets us read cookies from requests
var cookieParser = require("cookie-parser");

// Import a tool that logs HTTP requests in the console.
var logger = require("morgan");

// Import a tool that lets us use layouts with EJS templates
var expressLayouts = require("express-ejs-layouts");

// =============================================
// 2. ROUTE IMPORTS
// =============================================

// Import the main routes (homepage, products, etc.)
var indexRouter = require("./routes/index");

// Import the user-related routes
var usersRouter = require("./routes/users");

// Import the admin routes
var adminRouter = require("./routes/admin");

// =============================================
// 3. EXPRESS APP INITIALIZATION
// =============================================

// Create the main Express app
var app = express();

// =============================================
// 4. VIEW ENGINE SETUP
// =============================================

// Tell Express where to find the view templates
app.set("views", path.join(__dirname, "views"));

// Set EJS as the template engine for rendering views
app.set("view engine", "ejs");

// Enable the layout system for EJS
app.use(expressLayouts);

// Sets 'views/layout.ejs' as the default layout
app.set("layout", "layout");

// =============================================
// 5. MIDDLEWARE SETUP
// =============================================

// Enable request logging in development mode
app.use(logger("dev"));

// Enable express to read JSON and form data in requests
app.use(express.json());

// Enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Enable cookie parsing
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// =============================================
// 6. ROUTE REGISTRATION
// =============================================

// Set up main, user, and admin routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// =============================================
// 7. ERROR HANDLING
// =============================================

// If no route matches, create a 404 error
app.use(function (req, res, next) {
  next(createError(404));
});

// If any error happens, show an error page with a message and status code
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

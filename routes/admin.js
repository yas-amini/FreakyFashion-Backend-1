// Import the Express module
const express = require("express");
// Create a new router object for handling routes
const router = express.Router();
// Import a database connection from config
const db = require("../config/database");

// =============================================
// 2. ADMIN ROUTES
// =============================================
// Products List
router.get("/products", function (req, res, next) {
  // Get all products from database
  db.all(
    "SELECT * FROM products ORDER BY created_at DESC",
    [],
    (err, products) => {
      if (err) {
        console.error("Error fetching products:", err);
        products = []; // If there's an error, use an empty list
      }

      res.render("admin/products", {
        title: "Administration: Products", // Page title
        products: products, // Data to show in view
      });
    }
  );
});

// New Product Form
router.get("/products/new", function (req, res, next) {
  res.render("admin/new-product", {
    title: "Administration: New Product", // Page title
  });
});

// Create New Product
router.post("/products", function (req, res, next) {
  // Handle new product creation
});

// Export router to be used in other parts of the app
module.exports = router;

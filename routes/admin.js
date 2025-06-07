const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET /admin/products - List all products
router.get("/products", function (req, res, next) {
  // Get all products from database
  db.all(
    "SELECT * FROM products ORDER BY created_at DESC",
    [],
    (err, products) => {
      if (err) {
        console.error("Error fetching products:", err);
        products = [];
      }

      res.render("admin/products", {
        title: "Administration: Products",
        products: products,
      });
    }
  );
});

// GET /admin/products/new - Show new product form
router.get("/products/new", function (req, res, next) {
  res.render("admin/new-product", {
    title: "Administration: New Product",
  });
});

module.exports = router;

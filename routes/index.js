// =============================================
// 1. REQUIRED DEPENDENCIES
// =============================================

//Import the Express library — so we can use it to handle web requests.
const express = require("express");
//Create a router object from Express — this is where we define our app’s GET/POST routes.
const router = express.Router();
//Import the database connection — so this file can run SQL queries using that connection.
const db = require("../config/database");

// =============================================
// 2. PUBLIC ROUTES
// =============================================

/* Client(browser) sends a GET request the home page ("/") */
router.get("/", function (req, res, next) {
  // Run SQL to get 1 active hero content from the database
  db.get(
    "SELECT * FROM hero_content WHERE is_active = 1 LIMIT 1",
    [],
    (err, hero) => {
      if (err) {
        console.error("Error fetching hero content:", err);
        hero = null; // If there's an error, set hero to null
      }

      // Get all spots from database/Run SQL to get all spots
      db.all("SELECT * FROM spots", [], (err, spots) => {
        if (err) {
          console.error("Error fetching spots:", err);
          spots = []; // If there's an error, set spots to an empty array
        }

        // Get 8 popular products from database
        db.all("SELECT * FROM products LIMIT 8", [], (err, products) => {
          if (err) {
            console.error("Error fetching products:", err);
            products = []; // If there's an error, set products to an empty array
          }

          // Render a web page using this template and this data, and send it to the user's browser
          res.render("index", {
            title: "Freaky Fashion",
            hero: hero,
            spots: spots,
            products: products,
          });
        });
      });
    }
  );
});

/* GET product details page */
router.get("/products/:id", function (req, res, next) {
  const productId = req.params.id; // Get the product ID from the URL

  // Get the product details from the database
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, product) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).send("Error fetching product"); // Return error if product fetch fails
    }

    if (!product) {
      return res.status(404).send("Product not found"); // Return 404 if product is not found
    }

    // Get exactly 3 similar products (excluding the current product)
    db.all(
      "SELECT * FROM products WHERE id != ? ORDER BY RANDOM() LIMIT 3",
      [productId],
      (err, similarProducts) => {
        if (err) {
          console.error("Error fetching similar products:", err);
          similarProducts = []; // If there's an error, set similarProducts to an empty array
        }

        // Render the product-details view with the product and similar products
        res.render("product-details", {
          title: product.name,
          product: product,
          similarProducts: similarProducts,
        });
      }
    );
  });
});

/* GET search results page */
router.get("/search", function (req, res, next) {
  // Get search term from URL query string (e.g., /search?q=tshirt)
  const query = req.query.q || "";

  // Search database for products with matching names
  db.all(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${query}%`],
    (err, products) => {
      if (err) {
        console.error("Error searching products:", err);
        products = []; // If there's an error, set products to an empty array
      }

      // Pass to template:
      // - query: search term
      // - count: number of products found
      // - products: array of matching products
      res.render("search-results", {
        title: `Sökresultat: ${query}`,
        query: query,
        count: products.length,
        products: products,
      });
    }
  );
});

// =============================================
// 3. ADMIN ROUTES
// =============================================

// Admin routes
// GET /admin/products - List all products
router.get("/admin/products", function (req, res, next) {
  console.log("Admin products route hit");

  // Get all products from database
  db.all(
    "SELECT * FROM products ORDER BY created_at DESC",
    [],
    (err, products) => {
      if (err) {
        console.error("Error fetching products:", err);
        products = []; // If there's an error, set products to an empty array
      }

      console.log("Products found:", products);

      // Render the admin products view with the fetched products
      res.render("admin/products", {
        title: "Administration: Products",
        products: products,
        currentAdminPage: "products",
        layout: false,
      });
    }
  );
});

// GET /admin/products/new - Show new product form
router.get("/admin/products/new", function (req, res, next) {
  // Render the new product form view
  res.render("admin/new-product", {
    title: "Administration: New Product",
    layout: false,
  });
});

// POST /admin/products - Handle new product submission
router.post("/admin/products", function (req, res, next) {
  const { name, description, image, brand, sku, price } = req.body; // Extract product details from request body

  // Insert new product into database
  db.run(
    "INSERT INTO products (name, description, image_url, brand, sku, price) VALUES (?, ?, ?, ?, ?, ?)",
    [name, description, image, brand, sku, price],
    function (err) {
      if (err) {
        console.error("Error creating product:", err);
        return res.status(500).send("Error creating product"); // Return error if product creation fails
      }

      // Redirect to products list after successful creation
      res.redirect("/admin/products");
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  // Get hero content from database
  db.get(
    "SELECT * FROM hero_content WHERE is_active = 1 LIMIT 1",
    [],
    (err, hero) => {
      if (err) {
        console.error("Error fetching hero content:", err);
        hero = null;
      }

      // Get spots from database
      db.all("SELECT * FROM spots", [], (err, spots) => {
        if (err) {
          console.error("Error fetching spots:", err);
          spots = [];
        }

        // Get popular products from database (at least 8 products)
        db.all("SELECT * FROM products LIMIT 8", [], (err, products) => {
          if (err) {
            console.error("Error fetching products:", err);
            products = [];
          }

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
  const productId = req.params.id;

  // Get the product details
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, product) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).send("Error fetching product");
    }

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Get exactly 3 similar products (excluding the current product)
    db.all(
      "SELECT * FROM products WHERE id != ? ORDER BY RANDOM() LIMIT 3",
      [productId],
      (err, similarProducts) => {
        if (err) {
          console.error("Error fetching similar products:", err);
          similarProducts = [];
        }

        res.render("product-details", {
          title: product.name,
          product: product,
          similarProducts: similarProducts,
        });
      }
    );
  });
});

module.exports = router;

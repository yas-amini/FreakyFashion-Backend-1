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

      res.render("index", {
        title: "Express",
        hero: hero,
        spots: [],
        products: [],
      });
    }
  );
});

module.exports = router;

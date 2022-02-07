/*
 * All routes for addToCart are defined here
 * Since this file is loaded in server.js into api/addToCart,
 *   these routes are mounted onto /addToCart
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = `INSERT INTO cartitems (user_id, menuitem_id, order_id, checkout) VALUES (${req.body.userID}, ${req.body.menuID}, NULL, FALSE);`;
    db.query(query)
      .then((data) => {
        res.send("Successfully added to cart.");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

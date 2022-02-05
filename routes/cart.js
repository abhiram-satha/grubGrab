/*
 * All routes for cart are defined here
 * Since this file is loaded in server.js into api/cart,
 *   these routes are mounted onto /cart
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT cartitems.id AS id, menuitems.name AS name, menuitems.image AS image, menuitems.price AS price
    FROM cartitems
    JOIN menuitems ON menuitems.id = menuitem_id
    WHERE cartitems.checkout = 'f' AND user_id = 2;`;
    db.query(query)
      .then((data) => {
        const cart = data.rows;
        res.json({ cart });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

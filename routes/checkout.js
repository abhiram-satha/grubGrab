/*
 * All routes for removeFromCart are defined here
 * Since this file is loaded in server.js into api/cart,
 *   these routes are mounted onto /cart
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = `INSERT INTO orders (delivery_address_id, date_ordered, fulfilled) VALUES (3, NOW(), FALSE);`;
    for (const id of req.body.listIDs) {
      query += `UPDATE cartitems SET checkout = 'TRUE', order_id = (SELECT MAX(id) FROM orders) WHERE id = ${id};`;
    }
    console.log(query);
    db.query(query)
      .then((data) => {
        res.send("Successfully added to queue.");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

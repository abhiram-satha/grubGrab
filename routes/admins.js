/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT user_id, menuitems.name, users.first_name, users.last_name, users.phone_number
    FROM cartItems
    JOIN users ON cartitems.user_id = users.id
    JOIN menuitems ON cartitems.menuitem_id = menuitems.id
    WHERE checkout = false AND user_id = 2
    `;
    console.log(query);
    db.query(query)
      .then(data => {
        const admins = data.rows;
        res.json({ admins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

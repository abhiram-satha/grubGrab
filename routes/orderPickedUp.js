/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // console.log(req.body);
    let query = `UPDATE orders SET fulfilled = TRUE WHERE id = ${req.body.orderID}`;
    db.query(query)
      .then((data) => {})
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

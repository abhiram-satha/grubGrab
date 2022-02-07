/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `SELECT * FROM users WHERE id = 1`;
    db.query(query)
      .then((data) => {
        const user = data.rows[0];
        console.log(user);
        console.log(user.id);
        res.cookie("user_id", user.id);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

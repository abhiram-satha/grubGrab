/*
 * All routes for menuItems are defined here
 * Since this file is loaded in server.js into api/menuItems,
 *   these routes are mounted onto /menuItems
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `SELECT * FROM menuitems`;
    console.log(query);
    db.query(query)
      .then(data => {
        const menuitems = data.rows;
        res.json({ menuitems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

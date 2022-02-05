/*
 * All routes for addToCart are defined here
 * Since this file is loaded in server.js into api/cart,
 *   these routes are mounted onto /cart
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = `DELETE FROM cartitems WHERE id`;
    if (req.body.itemID.indexOf(",") !== -1) {
      let idsToDelete = req.body.itemID.split(",");
      for (const id of idsToDelete) {
        if (idsToDelete.indexOf(id) === 0) {
          query += ` in (${id},`;
        } else if (idsToDelete.indexOf(id) === idsToDelete.length - 1) {
          query += `${id});`;
        } else {
          query += `${id},`;
        }
      }
    } else {
      query += `= ${req.body.itemID};`;
    }
    db.query(query)
      .then((data) => {
        res.send("Successfully deleted.");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

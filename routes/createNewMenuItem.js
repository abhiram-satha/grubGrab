/*
 * All routes for replyToCustomer are defined here
 * Since this file is loaded in server.js into api/replyToCustomer,
 *   these routes are mounted onto /replyToCustomer
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    const menuItem = req.body;
    console.log(menuItem);
    const query = `INSERT INTO menuitems (name, keyingredient_id, ingredients, price, image)
    VALUES ('${menuItem.name}', ${menuItem.keyingredient_id}, '${menuItem.ingredients}', ${menuItem.price* 100}, '${menuItem.image}')`;
    console.log(query);
    db.query(query)
    .then((data) => {
      res.send('Added')
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
  return router;
};



const express = require("express");
const cart = require("./cart");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const updateNumber = req.body.updateNumber;
    const cartID = req.body.cartID;
    const userID = req.body.userID;

    let query = ``
    if (cartID.length > updateNumber) {
      query = `DELETE FROM cartitems WHERE id`
      const numToBeDeleted = cartID.length - updateNumber;

      if (numToBeDeleted === 1) {
        query += `= ${cartID[0]};`
      } else {
        query += ` IN (`
        for (let i = 0; i < numToBeDeleted; i++) {
          if (i === numToBeDeleted - 1) {
            query += `${cartID[i]});`
          } else {
            query += `${cartID[i]},`;
          }
        }
      }
    } else {
      // let queryTemplate = `INSERT INTO cartitems (user_id, menuitem_id, order_id, checkout) VALUES (${userID}, (SELECT menuitem_id FROM cartitems WHERE id = ${cartID};), null, FALSE);`
      let queryTemplate = `INSERT INTO cartitems (user_id, menuitem_id, order_id, checkout) SELECT user_id, menuitem_id, order_id, checkout FROM cartitems WHERE id = ${cartID}; `;

      const numToBeAdded = updateNumber - cartID.length;

      for (let i = 0; i <= numToBeAdded; i++) {
        query += queryTemplate;
      }

    }
    console.log(query);
    db.query(query)
      .then((data) => {
        res.send("Successfully Updated.");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

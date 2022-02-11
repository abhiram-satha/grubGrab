const express = require("express");
const cart = require("./cart");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const updateNumber = req.body.updateNumber;
    const cartID = req.body.cartID;
    const cartcheck = (cartID) => {
      if (Array.isArray(cartID)) {
        return cartID.length;
      } else {
        return 1
      }
    }
    let query = ``
    if (cartcheck(cartID) > updateNumber) {

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
      let queryTemplate = `INSERT INTO cartitems (user_id, menuitem_id, order_id, checkout) SELECT user_id, menuitem_id, order_id, checkout FROM cartitems WHERE id = ${cartID[0]}; `

      let numToBeAdded = updateNumber;

      if (!Array.isArray(cartID)) {
        numToBeAdded -= 1;
        queryTemplate = `INSERT INTO cartitems (user_id, menuitem_id, order_id, checkout) SELECT user_id, menuitem_id, order_id, checkout FROM cartitems WHERE id = ${cartID}; `
      } else {
        numToBeAdded -= cartID.length;
      }

      for (let i = 0; i < numToBeAdded; i++) {
        query += queryTemplate;
      }

    }
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

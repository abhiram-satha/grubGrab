/*
 * All routes for replyToCustomer are defined here
 * Since this file is loaded in server.js into api/replyToCustomer,
 *   these routes are mounted onto /replyToCustomer
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const accountSid = "AC95c8e1140b2de4371c4f528b50f4a36e";
const authToken = "f927dfc8a0b8109c6931c0a8d959b8bb";
const client = require("twilio")(accountSid, authToken);
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    let message = `Your order will be ready in ${req.body.orderTime} minutes!`;
    client.messages
      .create({
        body: message,
        from: "+19035009140",
        to: "+16479808027",
      })
      .then((message) => console.log(message.sid));
  });
  return router;
};

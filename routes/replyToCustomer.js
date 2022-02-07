/*
 * All routes for replyToCustomer are defined here
 * Since this file is loaded in server.js into api/replyToCustomer,
 *   these routes are mounted onto /replyToCustomer
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const accountSid = "AC66d6669b64355fa48493f2865b157bba";
const authToken = "0b1e63eab09c2c28fd1f751aa8515619";
const client = require("twilio")(accountSid, authToken);
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    let message = req.body.ownerMessage;
    console.log(message);
    client.messages
      .create({
        body: message,
        from: "+19106064785",
        to: "+16478239768",
      })
      .then((message) => console.log(message.sid));
    // db.query(query)
    //   .then((data) => {})
    //   .catch((err) => {});
  });
  return router;
};

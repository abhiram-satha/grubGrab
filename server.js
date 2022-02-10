// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const menuItemsRoutes = require("./routes/menuItems");
const removeFromCartRoutes = require("./routes/addToCart");
const addToCartRoutes = require("./routes/removeFromCart");
const checkoutRoutes = require("./routes/checkout");
const replyToCustomerRoutes = require("./routes/replyToCustomer");
const adminRoutes = require("./routes/admins");
const orderPickedUpRoutes = require("./routes/orderPickedUp");
const updateCartRoutes = require("./routes/updateCart");
const createNewMenuItems = require("./routes/createNewMenuItem");
// const loginUserOneRoute = require("./routes/userOne");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/cart", cartRoutes(db));
app.use("/api/menuItems", menuItemsRoutes(db));
app.use("/api/addToCart", removeFromCartRoutes(db));
app.use("/api/removeFromCart", addToCartRoutes(db));
app.use("/api/checkout", checkoutRoutes(db));
app.use("/api/replyToCustomer", replyToCustomerRoutes());
app.use("/api/admins", adminRoutes(db));
app.use("/api/orderPickedUp", orderPickedUpRoutes(db));
app.use("/api/updateCart", updateCartRoutes(db));
app.use("/api/createNewMenuItem", createNewMenuItems(db));
// app.use("/userOne", loginUserOneRoute(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const templateVars = { user_id: req.cookies.user_id };
  res.render("index", templateVars);
});

app.get("/1", (req, res) => {
  res.cookie("user_id", 1);
  res.redirect("/");
});

app.get("/2", (req, res) => {
  res.cookie("user_id", 2);
  res.redirect("/");
});

app.get("/3", (req, res) => {
  res.cookie("user_id", 3);/*
  * All routes for addToCart are defined here
  * Since this file is loaded in server.js into api/addToCart,
  *   these routes are mounted onto /addToCart
  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
  */
  res.render("adminIndex");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = db;

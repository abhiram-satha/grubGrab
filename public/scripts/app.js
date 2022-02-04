// // Client facing scripts here
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

//Connect to database
pool.connect;

//Test function
const listFoodItems = function () {
  return pool
    .query(
      `
        SELECT *
        FROM menuitems;
        `
    )
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((err) => console.error("query error", err.stack));
};

listFoodItems();

// module.exports = { listFoodItems };

console.log("Hello");

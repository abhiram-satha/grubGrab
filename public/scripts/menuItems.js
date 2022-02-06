// // const { render } = require("ejs");

// const createMealMenu = function (mealitem) {
//   $("article").addClass("new-items");
//   let menuItems = `
// <section class="food-card-holder">
// <div class="food-card">
//   <section class="food-info">
//     <div>
//       <img class="menu-image" src="${mealitem["image"]}" alt="chicken">
//     </div>
//     <div class="menu-desc">
//       <div class='menu-key'>
//         <div class='menu-name'>${mealitem["name"]}</div>
//         <div class='menu-price'>$${mealitem["price"] / 100}</div>
//       </div>
//       <div class='menu-ingredients'>${mealitem["ingredients"]}</div>
//     </div>
//   </section>
//   <button class="menu-button" data-value="${mealitem["id"]}">
//     Add To Cart
//   </button>
// </div>
// </section>`;

//   let result = $("article").append(menuItems);

//   return result;
// };

// const renderMeals = (meals, number) => {
//   $("#meal-container").empty();
//   for (const meal in meals) {
//     if (meals[meal]["keyingredient_id"] === number) createMealMenu(meals[meal]);
//   }
// };

// const currentCartQuantity = () => {
//   $.ajax({
//     type: "GET",
//     url: "api/cart",
//     data: "format.serialize()",
//   }).then((res) => {
//     const $cart = $(".cart div");
//     let cartNumber = res["cart"].length;
//     $cart[0]["innerText"] = cartNumber;
//   });
// };

// const registerEventHandler = () => {
//   //Add cart item
//   $(".menu-button").click(function (event) {
//     const $menuID = $(event.target).attr("data-value");
//     $.post("/api/addToCart", { menuID: $menuID });
//     currentCartQuantity();
//   });
// };
// // const { load } = require('sass');
// // const db = require('../../routes/menuItems');

// // const { render } = require("ejs");

// $(document).ready(function () {
//   $(".meat").click(function () {
//     $.ajax({
//       type: "GET",
//       url: "api/menuItems",
//       data: "format.serialize()",
//     }).then((response) => {
//       renderMeals(response["menuitems"], 1);
//       registerEventHandler();
//     });
//   });

//   $(".vegetarian").click(function () {
//     $.ajax({
//       type: "GET",
//       url: "api/menuItems",
//       data: "format.serialize()",
//     }).then((response) => {
//       renderMeals(response["menuitems"], 2);
//       registerEventHandler();
//     });
//   });

//   $(".sides").click(function () {
//     $.ajax({
//       type: "GET",
//       url: "api/menuItems",
//       data: "format.serialize()",
//     }).then((response) => {
//       renderMeals(response["menuitems"], 3);
//       registerEventHandler();
//     });
//   });

//   $(".desserts").click(function () {
//     $.ajax({
//       type: "GET",
//       url: "api/menuItems",
//       data: "format.serialize()",
//     }).then((response) => {
//       renderMeals(response["menuitems"], 4);
//       registerEventHandler();
//     });
//   });

//   $(".drinks").click(function () {
//     $.ajax({
//       type: "GET",
//       url: "api/menuItems",
//       data: "format.serialize()",
//     }).then((response) => {
//       renderMeals(response["menuitems"], 5);
//       registerEventHandler();
//     });
//   });

//   registerEventHandler();
// });

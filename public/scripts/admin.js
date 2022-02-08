// const { reservationsUrl } = require("twilio/lib/jwt/taskrouter/util");

const createMeatMenu = function (mealitem) {
  let menuItems = `

<tr class='customer-order order-row'>
  <td class='order-row order-id'>${mealitem["order_id"]}</td>
  <td class='order-row'>${mealitem["last_name"]}, ${mealitem["first_name"]}</td>
  <td class='order-row'>${mealitem["phone_number"]}</td>
  <td class='order-row'>${mealitem["cart_item"]}</td>
  <td><input type="text" class="time" name="ownermessages" />
  <button class="owner-reply">Submit</button></td>
  <td><button class="picked-up">&#10006</button></td>
 </tr>
 <
`;

  let result = $("#order-container").append(menuItems);

  return result;
};

const createNewMenuItem = function () {


  let newMenuForm = `
  <label>Key Ingredient:</label> <input type="number" min="1" max="5" class="key-ingredient" name="key-ingredient"/>
  <br>
  <label>Menu Name:</label> <input type="text" maxlength="25" class="menu-name" name="menu-name" required/><br>
  <label>Ingredients:</label> <input type="text" class="menu-ingredients" name="menu-ingredients" required/><br>
  <label>Price:</label> <input type="number" class="menu-price" name="menu-price" required/><br>
  <label>Image:</label> <input type="text" class="menu-image" name="menu-image" required/><br>
  <button class="owner-menu">Submit</button>

`
  let result = $('#new-form').append(newMenuForm)

  return result;
}

const noOrders = function () {
  let menuItems = `

<h3>Currently No Orders in the System</h3>
`;

  let result = $("#order-container").replaceWith(menuItems);

  return result;
};

const renderMeals = (orders) => {
  $(".customer-order").empty();

  if(Object.keys(orders).length === 0) {
    noOrders();
  } ;

  let foodObject = {};

  for (const order in orders) {
    if (!foodObject[orders[order]["id"]]) {
      foodObject[orders[order]["id"]] = {
        order_id: orders[order]["id"],
        user_id: orders[order]["user_id"],
        first_name: orders[order]["first_name"],
        last_name: orders[order]["last_name"],
        cart_item: [orders[order]["name"]],
        phone_number: orders[order]["phone_number"],
      };
    } else {
      foodObject[orders[order]["id"]]["cart_item"].push(orders[order]["name"]);
    }
  }
  // console.log(foodObject);

  for (const object in foodObject) {
    // console.log(foodObject[object]);
    createMeatMenu(foodObject[object]);
  }

  createNewMenuItem();
  registerEventHandler();
  registerFulfillment();
};

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "api/admins",
    data: "format.serialize()",
  }).then((response) => {
    // console.log(response['admins'])
    renderMeals(response["admins"]);
  });
});

const registerEventHandler = () => {
  $(".owner-reply").click(function (event) {
    const $time = $(this).siblings(".time").val();
    $(this)
      .siblings(".time")
      .replaceWith(`<input type="text" class="time" name="ownermessages" />`);
    event.preventDefault();
    $.post("/api/replyToCustomer", { orderTime: $time });
  });

  $(".picked-up").click(function () {
    const $orderID = $(this).parents("td").siblings(".order-id")[0].innerText;
    $.post("/api/orderPickedUp", { orderID: $orderID });
  });

  $('.owner-menu').click(function() {

    // keyingredient_id, name, ingredients, price, image
    const $menu_keyIngredient = $('.key-ingredient')[0].value;
    const $menu_name = $('.menu-name')[0].value;
    const $menu_ingredients = $('.menu-ingredients')[0].value;
    const $menu_price = $('.menu-price')[0].value;
    const $menu_image = $('.menu-image')[0].value;

    $.post("/api/createNewMenuItem", {keyingredient_id: $menu_keyIngredient,
      name: $menu_name,
      ingredients: $menu_ingredients,
      price: $menu_price,
      image: $menu_image
    })
    $('.key-ingredient')[0].value = "";
    $('.menu-name')[0].value = "";
    $('.menu-ingredients')[0].value = "";
    $('.menu-price')[0].value = "";
    $('.menu-image')[0].value = "";
  })

};

const registerFulfillment = () => {
  $(".picked-up").click(function (event) {
    const $removeOrder = $(this).parents('td').parents('tr')
    $removeOrder.replaceWith()
  })


}

// const registerNewItem = () => {
//   $(".owner-menu").click(function (event) {
//     const $removeOrder = $(this).parents('td').parents('tr')
//     $removeOrder.replaceWith()
//   })


// }

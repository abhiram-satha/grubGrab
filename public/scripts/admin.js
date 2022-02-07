// const { render } = require("ejs");

const createMeatMenu = function (mealitem) {
  let menuItems = `
<tr >          
          <th>Order Number</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th >Order</th>
          <th>Time till pickup</th>
          <th>Order Picked Up</th>
        </tr>
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

const renderMeals = (orders) => {
  $(".customer-order").empty();

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
  console.log(foodObject);

  for (const object in foodObject) {
    console.log(foodObject[object]);
    createMeatMenu(foodObject[object]);
  }

  let customerButton = ``;

  let result = $("#order-container").append(customerButton);
  registerEventHandler();
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
};
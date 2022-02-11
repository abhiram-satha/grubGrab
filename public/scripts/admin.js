// const { reservationsUrl } = require("twilio/lib/jwt/taskrouter/util");

const createPendingOrders = function (pendingOrder) {
  let orderInformation = `

<tr class='customer-order order-row'>
  <td class='order-row order-id'>${pendingOrder["order_id"]}</td>
  <td class='order-row'>${pendingOrder["last_name"]}, ${pendingOrder["first_name"]}</td>
  <td class='order-row'>${pendingOrder["phone_number"]}</td>
  <td class='order-row'>${pendingOrder["cart_item"]}</td>
  <td><input type="text" class="time" name="ownermessages" />
  <button class="owner-reply">Submit</button></td>
  <td><button class="picked-up">&#10006</button></td>
 </tr>

`;

  let result = $("#order-container").append(orderInformation);

  return result;
};

const createNewMenuItem = function () {


  let newMenuForm = `

  <table class="new-menu-table">
    <tr>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>
        <label>Key Ingredient:</label>
      </td>
      <td>
        <select class="key-ingredient" name='key-ingredient'>
          <option value='1'>Meat</option>
          <option value='2'>Vegetarian</option>
          <option value='3'>Sides</option>
          <option value='4'>Dessert</option>
          <option value='5'>Drinks</option>
        </select>
      </td>
    </tr>

    <div class="new-item">
      <tr>
        <td>
          <label>Menu Name: </label>
        </td>
        <td>
          <input type="text" maxlength="25" class="menu-name field-long" name="menu-name" required/>
        </td>
      </tr>
    </div>
    <div class="new-item">
      <tr>
        <td>
          <label>Ingredients: </label>
        </td>
        <td>
          <textarea type="text" class="menu-ingredients" name="menu-ingredients" required/>
        </td>
      </tr>
    </div>
    <div class="new-item">
      <tr>
        <td>
          <label>Price: </label>
        </td>
        <td>
          <input type="number" class="menu-price" name="menu-price" required/>
        </td>
      </tr>
    </div>
    <div class="new-item">
      <tr>
        <td>
          <label>Image: </label>
        </td>
        <td>
          <input type="text" class="menu-image" name="menu-image" required/>
        </td>
      </tr>
    </div>
    <div class="new-item owner-menu-submit">
      <tr>
        <td><button class="owner-menu">Submit</button>
        </td>
      </tr>
    </div>
  </table>
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

const ordersToBeFulfilled = (orders) => {
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

  for (const object in foodObject) {

    createPendingOrders(foodObject[object]);
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

    ordersToBeFulfilled(response["admins"]);
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

    const keyingredient_id = $('.key-ingredient')[0].value;
    const name = $('.menu-name')[0].value;
    const ingredients = $('.menu-ingredients')[0].value;
    const price = $('.menu-price')[0].value;
    const image = $('.menu-image')[0].value;

    //Not using $ as this is being pushed to the database
    $.post("/api/createNewMenuItem", {
      keyingredient_id,
      name,
      ingredients,
      price,
      image
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

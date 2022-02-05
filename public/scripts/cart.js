$(document).ready(function () {
  // ----- Helper Functions ------
  //Create Cart Object
  const createCartObject = function (cartArray) {
    const cartObject = {};

    for (const item of cartArray) {
      if (cartObject[item.name]) {
        console.log(cartObject[item.name]);
        cartObject[item.name]["quantity"] =
          cartObject[item.name]["quantity"] + 1;
      } else {
        cartObject[item.name] = {
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        };
      }
    }

    return cartObject;
  };

  //Create Cart Row
  const createCartItem = function (cartItem) {
    const newCartItem = `
    <tr>
    <td>
      <img
        class="food-icon"
        src="${cartItem.image}"
        alt="${cartItem.name}"
      />
    </td>
    <td>${cartItem.name}</td>
    <td>${cartItem.quantity}</td>
    <td>$${(cartItem.price * cartItem.quantity) / 100}</td>
    <td><button>&#10006</button></td>
  </tr>`;

    return newCartItem;
  };

  // ----- Cart Features ------
  //Item counter
  $("button").click(function () {
    const $cart = $(".cart div");
    let cartNumber = $cart[0]["innerText"];
    cartNumber++;
    $cart[0]["innerText"] = cartNumber;
  });

  //Load Cart Items
  const loadCartItems = function (cartItemsData) {
    const cartItems = createCartObject(cartItemsData);
    console.log(cartItems);
    for (const item in cartItems) {
      let $newCartItem = $(createCartItem(cartItems[item]));
      $(".orders-list").append($newCartItem);
    }
  };

  //Remove cart item
  $(".orders button").click(function () {
    const $itemToBeRemoved = $(this).parents("tr");
    $itemToBeRemoved.remove();
  });

  //Show/Hide Cart Menu
  $(".cart").click(function () {
    const $cartOrders = $(".orders");
    const displayValue = $cartOrders.css("display");
    if (displayValue === "none") {
      $cartOrders.slideDown();
    } else {
      $cartOrders.slideUp();
    }
  });

  //Render Cart Items
  $.ajax({
    type: "GET",
    url: "api/cart",
    data: "format.serialize()",
  }).then((res) => {
    loadCartItems(res["cart"]);
  });
});

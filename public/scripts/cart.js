$(document).ready(function () {
  // ----- Helper Functions ------
  //Create Cart Object
  const createCartObject = function (cartArray) {
    const cartObject = {};

    for (const item of cartArray) {
      if (cartObject[item.name]) {
        cartObject[item.name]["quantity"] =
          cartObject[item.name]["quantity"] + 1;
        cartObject[item.name]["id"].push(item.id);
      } else {
        cartObject[item.name] = {
          name: item.name,
          image: item.image,
          price: item.price,
          id: [item.id],
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
    <td><button data-value="${cartItem.id}">&#10006</button></td>
  </tr>`;

    return newCartItem;
  };

  //Register event handler
  const registerEventHandler = function () {
    //Remove cart item
    $(".orders button").click(function (event) {
      const $itemToBeRemoved = $(this).parents("tr");
      const $itemID = $(event.target).attr("data-value");
      $itemToBeRemoved.remove();
      $.post("/api/RemoveFromCart", { itemID: $itemID });
      $.ajax({
        type: "GET",
        url: "api/cart",
        data: "format.serialize()",
      }).then((res) => {
        const $cart = $(".cart div");
        let cartNumber = res["cart"].length;
        $cart[0]["innerText"] = cartNumber;
      });
    });
  };

  // ----- Cart Features ------
  //Load Cart Items
  const loadCartItems = function (cartItemsData) {
    const cartItems = createCartObject(cartItemsData);
    for (const item in cartItems) {
      let $newCartItem = $(createCartItem(cartItems[item]));
      $(".orders-list").append($newCartItem);
    }
  };

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
    const $cart = $(".cart div");
    let cartNumber = res["cart"].length;
    $cart[0]["innerText"] = cartNumber;
    loadCartItems(res["cart"]);
    registerEventHandler();
  });
});

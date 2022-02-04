$(document).ready(function () {
  //Test Object
  const cartItems = {
    "Chicken Parmesan": {
      name: "Chicken Parmesan",
      image:
        "https://www.cookingclassy.com/wp-content/uploads/2013/02/chicken-parmesan-16.jpg",
      price: 11.99,
      quantity: 1,
    },

    "Chicken Marsala": {
      name: "Chicken Marsala",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thechunkychef.com%2Fwp-content%2Fuploads%2F2016%2F04%2FEasy-Chicken-Marsala-9.jpg&f=1&nofb=1",
      price: 12.99,
      quantity: 1,
    },
  };
  //Helper Function
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
    <td>${cartItem.price * cartItem.quantity}</td>
    <td><button>&#10006</button></td>
  </tr>`;

    return newCartItem;
  };

  //Item counter
  $("button").click(function () {
    const $cart = $(".cart div");
    let cartNumber = $cart[0]["innerText"];
    cartNumber++;
    $cart[0]["innerText"] = cartNumber;
  });

  //Load Cart Items
  const loadCartItems = function (cartItems) {
    for (const item in cartItems) {
      console.log(cartItems);
      console.log(cartItems[item]);
      let $newCartItem = $(createCartItem(cartItems[item]));
      $(".orders-list").append($newCartItem);
    }
  };

  loadCartItems(cartItems);
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
});

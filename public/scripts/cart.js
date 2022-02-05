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
    <td>$${cartItem.price * cartItem.quantity}</td>
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

  // export default loadCartItems;

  loadCartItems([
    {
      name: "Nachos",
      image:
        "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vd3d3LmF2ZXJpZWNvb2tzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS9iZWVmbmFjaG9zLTUuanBnIiwiZXhwaXJlc19hdCI6MTYyMzA0MjIwNX0.ekevNVe2VrWfPZBME5M3qp-_bkQN24cOvABbE1dEOwQ/img.jpg?width=2000&height=2000",
      price: 5,
    },
    {
      name: "Fries",
      image: "https://www.delonghi.com/Global/recipes/multifry/91.jpg",
      price: 6,
    },
    {
      name: "Fries",
      image: "https://www.delonghi.com/Global/recipes/multifry/91.jpg",
      price: 6,
    },
  ]);

  // module.exports = { loadCartItems };

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
});

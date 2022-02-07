$(document).ready(function () {
  //---- Helper Functions -----
  //Cart Feature -- Create Cart Object
  const createCartObject = (cartArray) => {
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

  //Cart Feature -- Create Cart Row
  const createCartItem = (cartItem) => {
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
        <td><button class="remove-item" data-value="${
          cartItem.id
        }">&#10006</button></td>
      </tr>`;

    return newCartItem;
  };

  //Cart Feature -- Update current cart quantity
  const currentCartQuantity = () => {
    $.ajax({
      type: "GET",
      url: "api/cart",
      data: "format.serialize()",
    }).then((res) => {
      const $cart = $(".cart div");
      let cartNumber = res["cart"].length;
      $cart[0]["innerText"] = cartNumber;
    });
  };

  //Cart Feature -- Rebuild Cart
  const rebuildCart = () => {
    $(".orders-list").replaceWith(`      
    <table class="orders-list">
    <tr>
      <th class="cart-food-photo"></th>
      <th class="cart-food-name">Item</th>
      <th class="cart-food-quantity">Quantity</th>
      <th class="cart-food-cost">Cost</th>
      <th class="cart-food-remove">Remove</th>
    </tr>
  </table>`);
  };

  // Menu Feature - Create Card
  const createMealMenu = (mealitem) => {
    $("article").addClass("new-items");
    let menuItems = `
  <section class="food-card-holder">
  <div class="food-card">
    <section class="food-info">
      <div>
        <img class="menu-image" src="${mealitem["image"]}" alt="chicken">
      </div>
      <div class="menu-desc">
        <div class='menu-key'>
          <div class='menu-name'>${mealitem["name"]}</div>
          <div class='menu-price'>$${mealitem["price"] / 100}</div>
        </div>
        <div class='menu-ingredients'>${mealitem["ingredients"]}</div>
      </div>
    </section>
    <button class="menu-button" data-value="${mealitem["id"]}">
      Add To Cart
    </button>
  </div>
  </section>`;

    let result = $("article").append(menuItems);

    return result;
  };

  // Menu Feature - Render Meals
  const renderMeals = (meals, number) => {
    $("#meal-container").empty();
    for (const meal in meals) {
      if (meals[meal]["keyingredient_id"] === number)
        createMealMenu(meals[meal]);
    }
  };

  // ADDING EVENT HANDLERS

  // Cart Feature - Add event handler for removing items from cart
  const removeCartEventHandler = () => {
    $(".remove-item").click(function (event) {
      const $itemToBeRemoved = $(this).parents("tr");
      const $itemID = $(event.target).attr("data-value");
      $itemToBeRemoved.remove();
      $.post("/api/RemoveFromCart", { itemID: $itemID });
      currentCartQuantity();
      rebuildCart();
      setTimeout(renderCartItems, 500);
    });
  };

  // Cart/Menu Feature - Add event handler for adding items to cart
  const addCartEventHandler = () => {
    $(".menu-button").click((event) => {
      const $menuID = $(event.target).attr("data-value");
      rebuildCart();
      $.post("/api/addToCart", { menuID: $menuID });
      currentCartQuantity();
      setTimeout(renderCartItems, 500);
    });
  };

  // Cart Feature - Add event handler to checkout items from cart
  const checkoutEventHandler = () => {
    $("#checkout").click((event) => {
      rebuildCart();
      $.ajax({
        type: "GET",
        url: "api/cart",
        data: "format.serialize()",
      }).then((res) => {
        const itemIDs = [];
        for (const item in res.cart) {
          itemIDs.push(res.cart[item].id);
        }
        $.post("/api/checkout", { listIDs: itemIDs });
      });
      setTimeout(renderCartItems, 500);
    });
  };

  //---- Cart Features -----
  //Load Cart Items
  const loadCartItems = (cartItemsData) => {
    const cartItems = createCartObject(cartItemsData);
    let totalCost = 0;
    for (const item in cartItems) {
      let $newCartItem = $(createCartItem(cartItems[item]));
      $(".orders-list").append($newCartItem);
      totalCost += cartItems[item].price * cartItems[item].quantity;
    }
    $(".orders-list").append(`<tr>
    <td></td>
    <td></td>
    <td>Total</td>
    <td>$${totalCost / 100}</td>
    <td><button id="checkout">Checkout</button></td>
  </tr>`);
  };

  //Show/Hide Cart Menu
  $(".cart").click(() => {
    const $cartOrders = $(".orders");
    const displayValue = $cartOrders.css("display");
    if (displayValue === "none") {
      $cartOrders.slideDown();
    } else {
      $cartOrders.slideUp();
    }
  });

  //Render Cart Items
  const renderCartItems = () => {
    $.ajax({
      type: "GET",
      url: "api/cart",
      data: "format.serialize()",
    }).then((res) => {
      currentCartQuantity();
      loadCartItems(res["cart"]);
      removeCartEventHandler();
      checkoutEventHandler();
    });
  };

  //---- Menu Features -----
  $(".meat").click(function () {
    $.ajax({
      type: "GET",
      url: "api/menuItems",
      data: "format.serialize()",
    }).then((response) => {
      renderMeals(response["menuitems"], 1);
      addCartEventHandler();
    });
  });

  $(".vegetarian").click(function () {
    $.ajax({
      type: "GET",
      url: "api/menuItems",
      data: "format.serialize()",
    }).then((response) => {
      renderMeals(response["menuitems"], 2);
      addCartEventHandler();
    });
  });

  $(".sides").click(function () {
    $.ajax({
      type: "GET",
      url: "api/menuItems",
      data: "format.serialize()",
    }).then((response) => {
      renderMeals(response["menuitems"], 3);
      addCartEventHandler();
    });
  });

  $(".desserts").click(function () {
    $.ajax({
      type: "GET",
      url: "api/menuItems",
      data: "format.serialize()",
    }).then((response) => {
      renderMeals(response["menuitems"], 4);
      addCartEventHandler();
    });
  });

  $(".drinks").click(function () {
    $.ajax({
      type: "GET",
      url: "api/menuItems",
      data: "format.serialize()",
    }).then((response) => {
      renderMeals(response["menuitems"], 5);
      addCartEventHandler();
    });
  });

  renderCartItems();
});

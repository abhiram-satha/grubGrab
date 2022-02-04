$(document).ready(function () {
  //Item counter
  $("button").click(function () {
    const $cart = $(".cart div");
    console.log($cart);
    let cartNumber = $cart[0]["innerText"];
    cartNumber++;
    $cart[0]["innerText"] = cartNumber;
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

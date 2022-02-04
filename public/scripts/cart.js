$(document).ready(function () {
  //Show/Hide Cart Menu
  $(".cart").click(function () {
    let $cartOrders = $(".orders");
    let displayValue = $cartOrders.css("display");

    if (displayValue === "none") {
      $cartOrders.slideDown();
    } else {
      $cartOrders.slideUp();
    }
  });
});

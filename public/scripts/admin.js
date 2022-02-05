// const { render } = require("ejs");

const createMeatMenu = function (mealitem) {


let menuItems =
`
<tr class='customer-order order-row'>
  <td class='order-row'>${mealitem['last_name']}, ${mealitem['first_name']}</td>
  <td class='order-row'>${mealitem['phone_number']}</td>
  <td class='order-row'>${mealitem['name']}</td>
  </tr>
`

let result = $('#order-container').append(menuItems);

return result;
}



const renderMeals = (orders) => {
const mealContainer = $('.customer-order').empty();
for (const order in orders) {
  createMeatMenu(orders[order])

  console.log(orders[order]);
}
 let customerButton = `<button>Reply to Customer</button>`

 let result = $('#order-container').append(customerButton)
}


$(document).ready (function() {

  $.ajax({
      type: 'GET',
      url: 'api/admins',
      data: 'format.serialize()',
    }).then((response) => {
      console.log(response['admins'])
      renderMeals(response['admins'])
    });



})








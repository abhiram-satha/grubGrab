// const { render } = require("ejs");

const createMeatMenu = function (mealitem) {

if (mealitem['last_name']) {

}
let menuItems =
`
<tr >
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th >Order</th>
          <th>Time</th>
        </tr>
<tr class='customer-order order-row'>
  <td class='order-row'>${mealitem['last_name']}, ${mealitem['first_name']}</td>
  <td class='order-row'>${mealitem['phone_number']}</td>
  <td class='order-row'>${mealitem['name']}</td>
 <td> <form action="/timesent" id="target"> <label for="fname">Time Til Pickup:</label><br> <input type="text" id="time" name="time"> <input class='button-click' type="submit" value="Submit"></form></td>
`

let result = $('#order-container').append(menuItems);

return result;
}



const renderMeals = (orders) => {
const mealContainer = $('.customer-order').empty();
for (const order in orders) {
  createMeatMenu(orders[order])

  // console.log(orders[order]);
}
 let customerButton = ``

 let result = $('#order-container').append(customerButton)
}


$(document).ready (function() {

  $.ajax({
      type: 'GET',
      url: 'api/admins',
      data: 'format.serialize()',
    }).then((response) => {
      // console.log(response['admins'])
      renderMeals(response['admins'])
    });

$('#target').on('submit', (e)=> {
  e.preventDefault();
  // e.stopPropagation();
  const time = $(this).val();
  console.log(time);
  // $.ajax({ url: "/timesent", method: "POST", data: time }).then(() => {
  //   console.log(time);
  // });

})

})








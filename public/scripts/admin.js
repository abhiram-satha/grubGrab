// const { render } = require("ejs");

const createMeatMenu = function (mealitem) {


let menuItems =
`
<tr >
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th >Order</th>
          <th>Time Til Pickup:</th>
          <th>Sent?</th>
        </tr>
<tr class='customer-order order-row'>
  <td class='order-row'>${mealitem['last_name']}, ${mealitem['first_name']}</td>
  <td class='order-row'>${mealitem['phone_number']}</td>

  <td class='order-row'>${mealitem['cart_item']}</td>

  <td> <form action="/timesent" class="target"> <label for="fname"></label><br> <input type="text" id="time" name="time"> <input class='button-click' type="submit" value="Submit"></form></td>
  <td class='hidden target'>Text Delivered</td>

 </tr>

`

let result = $('#order-container').append(menuItems);

return result;
}



const renderMeals = (orders) => {
$('.customer-order').empty();

let foodObject = {};


for (const order in orders) {
  if (!foodObject[orders[order]['user_id']]) {
    foodObject[orders[order]['user_id']] = {
      first_name: orders[order]['first_name'],
      last_name: orders[order]['last_name'],
      cart_item: [orders[order]['name']],
      phone_number: orders[order]['phone_number']
    }

  } else {
    foodObject[orders[order]['user_id']]['cart_item'].push(orders[order]['name'])
  }

}
// console.log(foodObject);

for (const object in foodObject) {
  // console.log(foodObject[object]);
  createMeatMenu(foodObject[object])
}



//  $('#order-container').append(customerButton)
 registerEventHandler();
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



})

const registerEventHandler = () => {
  $('.target').on('submit', (e)=> {
    e.preventDefault();
    $('td.hidden').removeClass('hidden');

    // const time = $(this).val();
    // console.log(time);


    // $.ajax({ url: "/timesent", method: "POST", data: time }).then(() => {
    //   console.log(time);
    // });

  })
}






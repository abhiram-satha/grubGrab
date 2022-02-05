// const { render } = require("ejs");

const createMeatMenu = function (mealitem) {

$("article").addClass('new-items')
let menuItems = `
<section class="food-card-holder">
<div class="food-card">
  <section class="food-info">
    <div>
      <img class="menu-image" src="${mealitem['image']}" alt="chicken">
    </div>
    <div class="menu-desc">
      <div class='menu-key'>
        <div class='menu-name'>${mealitem['name']}</div>
        <div class='menu-price'>$${mealitem['price']}</div>
      </div>
      <div class='menu-ingredients'>${mealitem['ingredients']}</div>
    </div>
  </section>
  <button class="menu-button">
    Add To Cart
  </button>
</div>
</section>`

let result = $('article').append(menuItems);

return result;
}



const renderMeals = (meals, number) => {
const mealContainer = $('#meal-container').empty();
for (const meal in meals) {
  if(meals[meal]['keyingredient_id'] === number)
   createMeatMenu(meals[meal]);
}





}
// const { load } = require('sass');
// const db = require('../../routes/menuItems');

// const { render } = require("ejs");

$(document).ready (function() {


  $('.meat').click(function(){


    $.ajax({
      type: 'GET',
      url: 'api/menuItems',
      data: 'format.serialize()',
    }).then((response) => {
        renderMeals(response['menuitems'], 1);
    });
  })

  $('.vegetarian').click(function(){

    $.ajax({
      type: 'GET',
      url: 'api/menuItems',
      data: 'format.serialize()',
    }).then((response) => {
      renderMeals(response['menuitems'], 2);
    });

  })

  $('.sides').click(function(){


    $.ajax({
      type: 'GET',
      url: 'api/menuItems',
      data: 'format.serialize()',
    }).then((response) => {
          renderMeals(response['menuitems'], 3);
    });

  })

  $('.desserts').click(function(){

    $.ajax({
      type: 'GET',
      url: 'api/menuItems',
      data: 'format.serialize()',
    }).then((response) => {
          renderMeals(response['menuitems'], 4);

    });

  })

  $('.drinks').click(function(){


    $.ajax({
      type: 'GET',
      url: 'api/menuItems',
      data: 'format.serialize()',
    }).then((response) => {
          renderMeals(response['menuitems'], 5)
    });

  })
})





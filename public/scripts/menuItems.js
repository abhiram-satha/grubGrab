// const { load } = require('sass');
// const db = require('../../routes/menuItems');

$(document).ready (function() {

  // console.log('pink', db)

  $('.meat').click(function(){

    const meats = [
      {
        image: 'https://iheartumami.com/wp-content/uploads/2019/08/Whole30-Thai-Basil-Chicken-Paleo-Pad-Krapow-Gai-Easy-I-Heart-Umami-500x375.jpg',
        name: 'Chicken Parmasen',
        price: 12.99,
        description: 'boneless chicken breast, cayenne pepper, egg'
      },
      {
        image: 'https://media.olivegarden.com/en_us/images/product/Chicken-Marsala-dvp-1180X730.jpg',
        name: 'Chicken Marsala',
        price: 9.99,
        description: 'Boneless chicken breast, Thai Basil, Garlic, Chili Peppers, Eggs, Sea Salt, Fish Sauce, Osyter Sauce, Coconut Aminos'
      }
    ]


    renderMeals(meats);

  })

  $('.vegetarian').click(function(){

    const vegetarians = [
      {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2FC9nkoRZYQQjw6Mrk8FY6nqhORdk%3D%2F1500x1000%2Ffilters%3Afill(auto%2C1)%2Frice-noodle-salad-chili-lime-vinaigrette-3217646-11copy-5b3f91e546e0fb003755482d.jpg&f=1&nofb=1',
        name: 'Rice Noodle Salad',
        price: 13.99,
        description: 'rice noodles, romaine lettuce, red bell pepper, onions'
      },
      {
        image: 'https://www.simplyscratch.com/wp-content/uploads/2014/03/Roasted-Vegetable-Pasta-Primavera-www.SimplyScratch.com-salt-pepper-and-toss.jpg',
        name: 'Veggie Pasta',
        price: 11.99,
        description: 'Noodles, mushrooms, basil, cherry tomatoes, heavy cream'
      }
    ]


    renderMeals(vegetarians);

  })

  $('.sides').click(function(){

    const side = [
      {
        image: 'https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vd3d3LmF2ZXJpZWNvb2tzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS9iZWVmbmFjaG9zLTUuanBnIiwiZXhwaXJlc19hdCI6MTYyMzA0MjIwNX0.ekevNVe2VrWfPZBME5M3qp-_bkQN24cOvABbE1dEOwQ/img.jpg?width=2000&height=2000',
        name: 'Nachos',
        price: 4.99,
        description: 'tortilla  chips, black beans, sour cream, cheese'
      },
      {
        image: 'https://www.delonghi.com/Global/recipes/multifry/91.jpg',
        name: 'Fries',
        price: 5.99,
        description: 'potatoes, salt, truffle oil'
      }
    ]


    renderMeals(side);

  })

  $('.desserts').click(function(){

    const side = [
      {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seasonsandsuppers.ca%2Fwp-content%2Fuploads%2F2017%2F05%2Flemon-loaf800E-1170x780.jpg&f=1&nofb=1',
        name: 'Lemon Loaf',
        price: 3.99,
        description: 'butter, sugar, eggs, flour'
      },
      {
        image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F04%2F08%2FClone-of-a-Cinnabon-by-abrooks-2000.jpg&w=426&h=285&c=sc&poi=face&q=60',
        name: 'Cinnamon Rolls',
        price: 4.99,
        description: 'milk, eggs, margarine, flour, white sugar, yeast'
      }
    ]


    renderMeals(side);

  })

  $('.drinks').click(function(){

    const side = [
      {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fpurepng.com-ice-water-bottle-aquafinabottle-water-drink-aquafina-9415246348499t1u0.png&f=1&nofb=1',
        name: 'Bottled Water',
        price: 1.99,
        description: 'Spring Water'
      },
      {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.scoopsofmalton.co.uk%2Fwp-content%2Fuploads%2F2020%2F05%2Fcoca-cola.jpg&f=1&nofb=1',
        name: 'Coca-Cola',
        price: 0.99,
        description: null
      }
    ]


    renderMeals(side);

  })
})



const createMeatMenu = function (mealitem) {



  console.log('hi')
$("article").addClass('new-items')
//   console.log($meatMenu);
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
      <div class='menu-ingredients'>${mealitem['description']}</div>
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



const renderMeals = (meal) => {
const mealContainer = $('#meal-container').empty();

for (const mealItem of meal) {

  createMeatMenu(mealItem);
}

}

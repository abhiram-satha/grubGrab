// const { load } = require('sass');
// const db = require('../../routes/menuItems');

$(document).ready (function() {

  // console.log('pink', db)

  $('.meat').click(function(){

    const meals = [
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
        description: 'Boneless chicken breast, Thai Basil, Garlic, Chili Peppers, Eggs, Sea Salt, Fish Sauce, Osyter Sauce, Coconut Aminos boneless chicken breast, cayenne pepper, egg Boneless chicken breast, Thai Basil, Garlic, Chili Peppers, Eggs, Sea Salt, Fish Sauce, Osyter Sauce, Coconut Aminos'
      }
    ]

    // alert('hello');
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
          Add to cart
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
    renderMeals(meals);

  })
})

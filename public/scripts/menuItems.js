// const { load } = require('sass');
// const db = require('/server');

$(document).ready (function() {

  $('.meat').click(function(){

    // alert('hello');
      const createMeatMenu = function () {

        console.log('hi')
      $("article").addClass('new-items')
      //   console.log($meatMenu);
      let menuItems = `
      <section class="food-card-holder">
        <div class="food-card">
          <section class="food-info">
            <div>
              <img class="image" src="https://www.cookingclassy.com/wp-content/uploads/2013/02/chicken-parmesan-16.jpg" alt="chicken">
            </div>
            <div class="desc">
              Chicken Parmasen
              $12.99
              boneless chicken breast, eggs, parmesan cheese
            </div>
          </section>
          <button>
            Add to cart
          </button>
        </div>
      </section>`;

      let result = $('article').append(menuItems);

      return result;
    }

    createMeatMenu();

    // const renderMeals = (meals) => {
    //   const mealContainer = $('#meal-container').empty();

    //   for (const mealItem of meals) {
    //     const mealInfo = {
    //       image: mealItem.image,
    //       name: mealItem.name,
    //       price: mealItem.price,
    //       description: mealItem.description
    //     };

    //     const mealElement = createMeatMenu(mealInfo);
    //     mealContainer.append(mealElement);
    //   }

    // }

    // const loadTweets = () => db
    //   .query(`
    //       SELECT * FROM menuitems`)
    //   .then((result) => {
    //     return renderMeals(result.rows);
    //   });

    // loadTweets();



  })
})

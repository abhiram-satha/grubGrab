// const { load } = require('sass');
// const db = require('/server');

$(document).ready (function() {

  $('.meat').click(function(){

    const meals = [
      {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thechunkychef.com%2Fwp-content%2Fuploads%2F2016%2F04%2FEasy-Chicken-Marsala-9.jpg&f=1&nofb=1',
        name: 'Chicken Parmasen',
        price: 12.99,
        description: 'boneless chicken breast, cayenne pepper, egg'
      },
      {
        image: 'https://www.cookingclassy.com/wp-content/uploads/2013/02/chicken-parmesan-16.jpg',
        name: 'Chicken Marsala',
        price: 9.99,
        description: 'boneless chicken breast, cayenne pepper, egg'
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
              <img class="image" src="${mealitem['image']}" alt="chicken">
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



    const renderMeals = (meal) => {
      const mealContainer = $('#meal-container').empty();

      for (const mealItem of meal) {

        createMeatMenu(mealItem);
      }

    }
    renderMeals(meals);
    // const loadTweets = () => db
    //   .query(`
    //       SELECT * FROM menuitems`)
    //   .then((result) => {
    //     return renderMeals(result.rows);
    //   });

    // loadTweets();



  })
})

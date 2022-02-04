const { load } = require('sass');
const db = require('/server');

$(document).ready (function() {

  $('.meat').click(function(){
      const createMeatMenu = function (meal) {

      let $meatMenu = $("<article>").addClass('new-items')

      let menuItems = `
      <section class="food-card-holder">
        <div class="food-card">
          <section class="food-info">
            <div>
              <img class="image" src="${meal.image}" alt="${meal.name}">
            </div>
            <div class="desc">
              ${meal.name}
              ${meal.price}
              ${meal.description}
            </div>
          </section>
          <button>
            Add to cart
          </button>
        </div>
      </section>`;

      let result = $meatMenu.append(menuItems);

      return result;
    }


    const renderMeals = (meals) => {
      const mealContainer = $('#meal-container').empty();

      for (const mealItem of meals) {
        const mealInfo = {
          image: mealItem.image,
          name: mealItem.name,
          price: mealItem.price,
          description: mealItem.description
        };

        const mealElement = createMeatMenu(mealInfo);
        mealContainer.append(mealElement);
      }

    }

    const loadTweets = () => db
      .query(`
          SELECT * FROM menuitems`)
      .then((result) => {
        return renderMeals(result.rows);
      });

    loadTweets();



  })
})

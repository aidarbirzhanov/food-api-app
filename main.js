const searchBtn = document.getElementById("search__btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal__details-content");
const recipeCloseBtn = document.getElementById("recipe__close-btn");

//event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});
//get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search__input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          <div class= "meal__item" data-id=${meal.idMeal}>
            <div class="meal__img">
               <img src="${meal.strMealThumb}" alt="food" />
            </div>
            <div class="meal__name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe__btn">Get recipe</a>
          </div>
        </div>
        `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

//get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe__btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((responce) => responce.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

//create a modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
          <h2 class="recipe__title">${meal.strMeal}</h2>
                    <p class="recipe__category">${meal.strCategory}</p>
                    <div class="recipe__instruct">
                      <h3>Instructions:</h3>
                      <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe__meal-img">
                      <img src="${meal.strMealThumb}" alt="" />
                    </div>
                    <div class="recipe__link">
                      <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

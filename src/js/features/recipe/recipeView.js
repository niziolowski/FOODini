import icons from "../../../img/icons.svg";

class recipeView {
  _parentElement = document.querySelector(".recipe-preview");
  _recipeSummary = document.querySelector(".recipe-preview__summary");
  _recipeTitle = document.querySelector(".recipe-preview__title");
  _recipeInstructions = document.querySelector(".recipe-preview__instructions");

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  render(recipe, state) {
    // Render recipe summary
    this._recipeSummary.innerHTML = this.generateRecipeSummaryMarkup(
      recipe,
      state
    );
    // Add id to summary element for reference
    this._recipeSummary.dataset.id = `r-${recipe.id}`;

    // Render recipe Title
    this._recipeTitle.textContent = `${recipe.title}`;

    // Render recipe instructions
    this._recipeInstructions.innerText = `${recipe.description}`;

    // replace svg icons
    feather.replace();
  }

  generateRecipeSummaryMarkup(recipe, state) {
    // get tag color
    const tag = state.tags.recipes.indexOf(recipe.group) + 1;

    // generate difficulty indicator
    let difficulty = "";

    for (let i = 0; i < 5; i++) {
      difficulty += `
            <svg class="${recipe.difficulty > i ? "fill" : ""}">
                <use href="${icons}#star"></use>
            </svg> 
        `;
    }

    // define colors for ingredients indicator
    const color =
      recipe.indicator < 20 ? "var(--warning-color)" : "var(--accent-color)";

    return `
    <div class="recipe-preview__image">
        <img src="${recipe.imageURL}" alt="recipe-photo" />
    </div>
    <button class="recipe-preview__btn-bookmark btn-icon small fill ${
      recipe.bookmark ? "active" : ""
    }">
        <i data-feather="star"></i>
    </button>
    <div class="recipe-preview__summary__info">
    <div class="recipe-preview__summary__info__tag" style="background-color: var(--tag-${tag}-color)">${
      recipe.group
    }</div>
    <div class="recipe-preview__summary__info__difficulty">
        <div class="info-difficulty">
        <p>Trudność</p>
        <div class="info-difficulty__indicator">${difficulty}</div>
        </div>
    </div>
    <div class="recipe-preview__summary__info__ingredients">
        <div class="info-ingredients">
        <p>Składniki</p>
        <div class="info-ingredients__indicator">
        <div class="info-ingredients__indicator__bar" style="width: ${
          recipe.indicator
        }%; background-color: ${color}"></div>
        </div>
        </div>
    </div>
    </div>
    <div class="recipe-summary__ingredients">
    <div class="recipe-summary__ingredients__title">
        <p>Składniki</p>
        <div class="recipe-summary__ingredients__servings">
        <button class="btn-icon tiny negative">
            <i data-feather="minus"></i>
        </button>
        <div class="recipe-summary__ingredients__servings__number">1</div>
        <button class="btn-icon tiny negative">
            <i data-feather="plus"></i>
        </button>
        </div>
    </div>
    <ul class="recipe-summary__ingredient-list">
        ${recipe.ingredients
          .map((ing) => {
            return `
          <li class="recipe-summary__list-item">
          <div class="recipe-summary__list-item__indicator">
              <i data-feather="${
                // Check if current ingredient is on the missing list and choose icon accordingly
                recipe.missingIngredients.find(
                  (item) => item.name === ing.name
                ) === undefined
                  ? "check"
                  : "x"
              }"></i>
          </div>
          <p class="recipe-summary__list-item__name">${ing.name}</p>
          <p class="recipe-summary__list-item__amount">${ing.amount}</p>
          <p class="recipe-summary__list-item__unit">${ing.unit}</p>
        </li>
        
          `;
          })
          .join("")}
        
    </ul>
    </div>
    <div class="recipe-summary__spices">
    <div class="recipe-summary__ingredients__title">
        <p>Przyprawy</p>
    </div>
    <ul class="recipe-summary__spices-list">
        <li class="recipe-summary__list-item">
        <p class="recipe-summary__list-item__name">・ Sól</p>
        </li>
        <li class="recipe-summary__list-item">
        <p class="recipe-summary__list-item__name">・Pieprz</p>
        </li>
    </ul>
    </div>
    `;
  }

  // Handle Hash change
  addHandlerHashChange(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler.bind(this))
    );
  }
}
export default new recipeView();

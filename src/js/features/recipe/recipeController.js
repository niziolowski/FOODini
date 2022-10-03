import recipeView from "./recipeView.js";
import sidebarView from "../sidebar/sidebarView.js";
import * as recipeModel from "./recipeModel.js";
import * as model from "../../model.js";

function controlHashChange(e) {
  // Get hash value
  const hash = window.location.hash.slice(1).replaceAll("%20", " ");

  // Get recipe data
  const recipe = recipeModel.getRecipe(hash);

  if (!recipe) return;

  // Render recipe
  recipeView.render(recipe, model.state);
  // Show recipe
  recipeView.show();
}

function controlClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) recipeView.hide();

  const btn = e.target.closest("button");

  if (btn) {
    if (btn.classList.contains("recipe-preview__btn-close")) recipeView.hide();

    // Bookmark BTN
    if (btn.classList.contains("recipe-preview__btn-bookmark")) {
      // get item ID
      const id = +btn
        .closest(".recipe-preview__summary")
        .dataset.id.split("-")[1];

      // get ingredient
      const recipe = model.state.recipes.find((rec) => rec.id === id);
      recipe.toggleBookmark();
      recipe.upload();

      // update views
      sidebarView.render(model.state);
      recipeView.render(recipe, model.state);
    }
  }

  //   clear hash after closing modal
  window.location.hash = "";
}

function init() {
  recipeView.addHandlerHashChange(controlHashChange);
  recipeView.addHandlerClick(controlClick);
}
init();

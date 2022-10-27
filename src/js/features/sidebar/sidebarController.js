import sidebarView from "./sidebarView.js";
import addIngredientView from "../addIngredient/addIngredientView.js";
import mainView from "../main/mainView.js";
import * as model from "../../model.js";

/**
 * Handles button clicks, tabs
 * @param {Event} e
 */
export function handleClick(e) {
  // Get button
  const btn = e.target.closest("button");
  // Handle btn click
  if (btn) {
    // Add product
    if (btn.classList.contains("sidebar__btn-add-ingredient")) {
      addIngredientView.show();
    }

    // Tabs
    if (btn.classList.contains("btn-tab")) {
      sidebarView.handleTabs(btn, model.state);
    }

    // Expand view
    if (btn.classList.contains("sidebar__btn-full-page")) {
      // Change the view
      sidebarView.toggleFullPage(model.state);
    }

    // Toggle view
    if (btn.classList.contains("sidebar-header__btn-sidebar")) {
      sidebarView.toggle();
      mainView.shift();
      sidebarView.toggleFullPage(model.state);
    }

    // STORAGE
    // Bookmark BTN
    if (btn.classList.contains("list-item-storage__btn-bookmark")) {
      // get item ID
      const id = +btn.closest("li").dataset.id.split("-")[1];

      // get ingredient
      const ingredient = model.state.storage.find((ing) => ing.id === id);

      ingredient.toggleBookmark();

      // Update View
      sidebarView.render(model.state);
    }

    // RECIPES
    // Bookmark BTN
    if (btn.classList.contains("list-item-recipe__btn-bookmark")) {
      // get item ID
      const id = +btn.closest("li").dataset.id.split("-")[1];

      // get ingredient
      const recipe = model.state.recipes.find((rec) => rec.id === id);
      recipe.toggleBookmark();
      sidebarView.render(model.state);
    }
  }
}

export function init() {
  sidebarView.init(model.state);
  sidebarView.addHandlerClick(handleClick);
  console.log("IMPORT SUCCESSFUL: sidebarController");
}

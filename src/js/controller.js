// FEATURE BASED MVC STRUCTURE TEST
import * as sidebarController from "./features/sidebar/sidebarController.js";
import mainController from "./features/main/mainController.js";
import navController from "./features/nav/navController.js";
import settingsController from "./features/settings/settingsController.js";
import addIngredientController from "./features/addIngredient/addIngredientController.js";
import shoppingListController from "./features/shoppingList/shoppingListController.js";
import recipeController from "./features/recipe/recipeController.js";
import catalogController from "./features/catalog/catalogController.js";
import addProductController from "./features/addProduct/addProductController.js";

init();

// TESTING

// load color theme
import settingsView from "./features/settings/settingsView.js";
import * as model from "./model.js";
settingsView.updateColorTheme(model.state.colorTheme);

async function init() {
  try {
    // Load state from API (for now only storage and recipes)
    // await model.loadState();
    // model.loadRecipes();
    // Init sidebar
    sidebarController.init();

    console.log(JSON.stringify(model.state.plan.activeWeek));
  } catch (error) {
    console.error(error);
  }
}

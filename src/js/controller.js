// FEATURE BASED MVC STRUCTURE TEST
import * as sidebarController from "./features/sidebar/sidebarController.js";
import * as mainController from "./features/main/mainController.js";
import * as navController from "./features/nav/navController.js";
import settingsController from "./features/settings/settingsController.js";
import addIngredientController from "./features/addIngredient/addIngredientController.js";
import * as shoppingListController from "./features/shoppingList/shoppingListController.js";
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
    await model.APIdownload();

    // Init modules
    mainController.init();
    navController.init();
    sidebarController.init();
    shoppingListController.init();

    // Upload state every 5 seconds
    setInterval(model.APIupload, 5000);
  } catch (error) {
    console.error(error);
  }
}

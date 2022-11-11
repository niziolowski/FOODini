// FEATURE BASED MVC STRUCTURE TEST
import * as sidebarController from "./features/sidebar/sidebarController.js";
import * as mainController from "./features/main/mainController.js";
import * as navController from "./features/nav/navController.js";
import settingsController from "./features/settings/settingsController.js";
import addIngredientController from "./features/addIngredient/addIngredientController.js";
import * as shoppingListController from "./features/shoppingList/shoppingListController.js";
import recipeController from "./features/recipe/recipeController.js";
import catalogController from "./features/catalog/catalogController.js";
import * as addProductController from "./features/addProduct/addProductController.js";
import addRecipeController from "./features/addRecipe/addRecipeController.js";
import settingsView from "./features/settings/settingsView.js";
import * as model from "./model.js";

init();

async function init() {
  try {
    // Load state from API
    await model.APIdownload();

    // Initialize modules
    mainController.init();
    navController.init();
    sidebarController.init();
    shoppingListController.init();
    addProductController.init();

    // Load color theme
    settingsView.updateColorTheme(model.state.colorTheme);

    // Upload state every 5 seconds
    setInterval(model.APIupload, 5000);
  } catch (error) {
    console.error(error);
  }
}

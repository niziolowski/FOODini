// FEATURE BASED MVC STRUCTURE TEST
import sidebarController from "./features/sidebar/sidebarController.js";
import navController from "./features/nav/navController.js";
import settingsController from "./features/settings/settingsController.js";
import addProductController from "./features/addProdduct/addProductController.js";
import shoppingListController from "./features/shoppingList/shoppingListController.js";

// TESTING (load color theme)
import settingsView from "./features/settings/settingsView.js";
import * as model from "./model.js";
settingsView.updateColorTheme(model.state.colorTheme);

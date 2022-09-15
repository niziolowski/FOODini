// import settingsView from "./views/settingsView.js";
// import shoppingListView from "./views/shoppingListView.js";
// import navView from "./views/navView.js";

// import * as model from "./model.js";
// // import sidebarView from "./views/sidebarView.js";
// import mainView from "./views/mainView.js";
// import addProductView from "./views/addProductView.js";
// § NAV

// function controlNav(e) {
//   // Get button
//   const btn = e.target.closest("button");

//   if (!btn) return;

//   // Settings button
//   if (btn.classList.contains("main-view__nav__btn-settings"))
//     settingsView.show();

//   // Sidebar button
//   if (btn.classList.contains("main-view__nav__btn-sidebar")) {
//     sidebarView.toggle();
//     mainView.shift();
//   }
// }

// § SETTIGNS
// function controlSettings(e) {
// // Handle overlay click
// if (e.target.classList.contains("overlay")) settingsView.hide();
// // Get clicked button
// const btn = e.target.closest("button");
// const input = e.target.closest("input");
// // Close btn
// if (btn) {
//   if (btn.classList.contains("settings-header__btn-close"))
//     settingsView.hide();
// }
// // HANDLE COLOR THEMES
// if (input) {
//   // Create a one time event handler
//   function handleColorThemes(e) {
//     // 1. update state
//     model.updateColorTheme(e.target);
//     // 2. update view
//     settingsView.updateColorTheme(model.state.colorTheme);
//     // Remove event listener (this)
//     input.removeEventListener("change", handleColorThemes);
//   }
//   input.addEventListener("change", handleColorThemes); // it will remove itself after executing
// }
// }

// § SIDEBAR

// function controlSidebar(e) {
//   // Get button
//   const btn = e.target.closest("button");

//   // Handle btn click
//   if (btn) {
//     if (btn.classList.contains("sidebar-options__btn-add-product"))
//       addProductView.show();
//   }
// }

// § ADD PRODUCT

// function controlAddProduct(e) {
// // Handle overlay click
// if (e.target.classList.contains("overlay")) addProductView.hide();
// // Get button
// const btn = e.target.closest("button");
// // Handle btn click
// if (btn) {
//   if (btn.classList.contains("add-product-content__header__btn-close"))
//     addProductView.hide();
// }
// }

// function init() {
//   // 1. Load

//   // load color-theme from state
//   settingsView.updateColorTheme(model.state.colorTheme);

//   shoppingListView.init();
//   navView.addHandlerClick(controlNav);
//   settingsView.addHandlerClick(controlSettings);
//   sidebarView.addHandlerClick(controlSidebar);
//   addProductView.addHandlerClick(controlAddProduct);
// }

// init();

// testing
// addProductView.show();
// sidebarView.show();
// mainView.shift();

// autocomplete
// addProductView.init();

// FEATURE MVC STRUCTURE TEST
import sidebarController from "./features/sidebar/sidebarController.js";
import navController from "./features/nav/navController.js";
import settingsController from "./features/settings/settingsController.js";
import addProductController from "./features/addProdduct/addProductController.js";
import shoppingListController from "./features/shoppingList/shoppingListController.js";

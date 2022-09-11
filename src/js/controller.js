import settingsView from "./views/settingsView.js";
import shoppingListView from "./views/shoppingListView.js";
import navView from "./views/navView.js";
import view from "./views/view.js";
import * as model from "./model.js";
// § NAV

function controlNav(e) {
  // Get button
  const btn = e.target.closest("button");

  if (!btn) return;

  // Settings button
  if (btn.classList.contains("main-view__nav__btn-settings"))
    settingsView.show();
}

// § SETTIGNS
function controlSettings(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) settingsView.hide();
  // Get clicked button
  const btn = e.target.closest("button");
  const input = e.target.closest("input");

  // Close btn
  if (btn.classList.contains("settings-header__btn-close")) settingsView.hide();

  // HANDLE COLOR THEMES
  if (input) {
    // Create a one time event handler
    function handleColorThemes(e) {
      // 1. update state
      model.updateColorTheme(e.target);
      // 2. update view
      settingsView.updateColorTheme(model.state.colorTheme);

      // Remove event listener (this)
      input.removeEventListener("change", handleColorThemes);
    }

    input.addEventListener("change", handleColorThemes); // it will remove itself after executing
  }
}

function init() {
  // 1. Load

  // load color-theme from state
  settingsView.updateColorTheme(model.state.colorTheme);

  shoppingListView.init();
  navView.addHandlerClick(controlNav);
  settingsView.addHandlerClick(controlSettings);
}

init();

// testing

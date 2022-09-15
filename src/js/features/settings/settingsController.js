import settingsView from "./settingsView.js";
import * as settingsModel from "./settingsModel.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) settingsView.hide();
  // Get clicked button
  const btn = e.target.closest("button");
  const input = e.target.closest("input");

  // Close btn
  if (btn) {
    if (btn.classList.contains("settings-header__btn-close"))
      settingsView.hide();
  }

  // HANDLE COLOR THEMES
  if (input) {
    // Create a one time event handler
    function handleColorThemes(e) {
      // 1. update state
      const newTheme = settingsModel.updateColorTheme(e.target);
      // 2. update view
      settingsView.updateColorTheme(newTheme);

      // Remove event listener (this)
      input.removeEventListener("change", handleColorThemes);
    }

    input.addEventListener("change", handleColorThemes); // it will remove itself after executing
  }
}

function init() {
  settingsView.addHandlerClick(handleClick);

  console.log("IMPORT SUCCESSFUL: settingsController");
}

init();

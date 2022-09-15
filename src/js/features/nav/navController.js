import navView from "./navView.js";
import sidebarView from "../sidebar/sidebarView.js";
import mainView from "../main/mainView.js";
import settingsView from "../settings/settingsView.js";

function handleClick(e) {
  // Get button
  const btn = e.target.closest("button");

  if (!btn) return;

  // Settings button
  if (btn.classList.contains("main-view__nav__btn-settings"))
    settingsView.show();

  // Sidebar button
  if (btn.classList.contains("main-view__nav__btn-sidebar")) {
    sidebarView.toggle();
    mainView.shift();
  }
}

function init() {
  navView.addHandlerClick(handleClick);

  console.log("IMPORT SUCCESSFUL: navController");
}

init();

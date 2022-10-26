import navView from "./navView.js";
import sidebarView from "../sidebar/sidebarView.js";
import mainView from "../main/mainView.js";
import * as mainModel from "../main/mainModel.js";
import settingsView from "../settings/settingsView.js";
import * as model from "../../model.js";

async function handleClick(e) {
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

  // § PLAN CONTROLLS

  // Next week btn
  if (btn.classList.contains("main-view__nav__controlls__next")) {
    // Switch to next week
    const week = await mainModel.nextWeek();

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);
  }

  // Add to shopping list
  if (
    btn.classList.contains("main-view__nav__controlls__btn-add-shopping-list")
  ) {
    // clear shopping list
    //* shoppingListModel ?

    //* -------------------
    console.log("test");
  }

  // Previous week btn
  if (btn.classList.contains("main-view__nav__controlls__previous")) {
    // Switch to next week
    const week = mainModel.previousWeek();

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);
  }

  // Current week btn
  if (btn.classList.contains("main-view__nav__controlls__current")) {
    // Switch to current week
    mainModel.setActiveWeek(model.state.plan.currentWeek);

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);
  }
}

function init() {
  navView.addHandlerClick(handleClick);

  console.log("IMPORT SUCCESSFUL: navController");
}

init();

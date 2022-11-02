import navView from "./navView.js";
import sidebarView from "../sidebar/sidebarView.js";
import mainView from "../main/mainView.js";
import * as mainModel from "../main/mainModel.js";
import settingsView from "../settings/settingsView.js";
import * as model from "../../model.js";
import shoppingListView from "../shoppingList/shoppingListView.js";
import * as shoppingListModel from "../shoppingList/shoppingListModel.js";

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

  // § PLAN CONTROLLS

  // Next week btn
  if (btn.classList.contains("main-view__nav__controlls__next")) {
    // Switch to next week
    const week = mainModel.nextWeek();

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);
    navView.updateBtnSync(week.sync);
  }

  // Shopping list synchronisation
  if (
    btn.classList.contains("main-view__nav__controlls__btn-add-shopping-list")
  ) {
    // Get active week
    const week = model.state.plan.activeWeek;

    // Change Week-sync status
    mainModel.toggleWeekSync(week);
    // update View
    navView.updateBtnSync(week.sync);

    // // When turning sync ON
    // if (btn.classList.contains("active")) {
    //   // Add missing products from active week to shopping list
    //   week.days.forEach((day) =>
    //     day.meals.forEach((meal) =>
    //       shoppingListModel.addItem("sync", meal.missing)
    //     )
    //   );
    // }

    // // When turning sync OFF
    // if (!btn.classList.contains("active")) {
    //   // Remove missing product from shopping list for active week
    //   week.days.forEach((day) =>
    //     day.meals.forEach((meal) =>
    //       shoppingListModel.deleteItem("sync", meal.missing)
    //     )
    //   );
    // }

    shoppingListModel.recalcShoppingList();

    shoppingListView.render(model.state.shoppingList);
  }

  // Previous week btn
  if (btn.classList.contains("main-view__nav__controlls__previous")) {
    // Switch to next week
    const week = mainModel.previousWeek();
    if (!week) return;

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);

    navView.updateBtnSync(week.sync);
  }

  // Current week btn
  if (btn.classList.contains("main-view__nav__controlls__current")) {
    // Switch to current week
    mainModel.setActiveWeek(model.state.plan.currentWeek);

    // Update view
    mainView.render(model.state.plan.activeWeek, model.state);

    // Update subtitle
    navView.updateSubtitle(model.state.plan.activeWeek.name);
    navView.updateBtnSync(model.state.plan.activeWeek.sync);
  }
}

export function init() {
  navView.addHandlerClick(handleClick);

  // Init Week-list sync btn

  navView.updateBtnSync(model.state.plan.activeWeek.sync);

  console.log("IMPORT SUCCESSFUL: navController");
}

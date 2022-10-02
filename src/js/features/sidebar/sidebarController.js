import sidebarView from "./sidebarView.js";
import addProductView from "../addProdduct/addProductView.js";
import mainView from "../main/mainView.js";
import * as model from "../../model.js";

/**
 * Handles button clicks, tabs
 * @param {Event} e
 */
export function handleClick(e) {
  // Get button
  const btn = e.target.closest("button");
  // Handle btn click
  if (btn) {
    // Add product
    if (btn.classList.contains("sidebar__btn-add-product"))
      addProductView.show();

    // Tabs
    if (btn.classList.contains("btn-tab")) {
      sidebarView.handleTabs(btn, model.state);
    }

    // Expand view
    if (btn.classList.contains("sidebar__btn-full-page")) {
      // Change the view
      sidebarView.toggleFullPage(model.state);
    }

    // Toggle view
    if (btn.classList.contains("sidebar-header__btn-sidebar")) {
      sidebarView.toggle();
      mainView.shift();
      sidebarView.toggleFullPage(model.state);
    }
  }
}

export function init() {
  sidebarView.init(model.state);
  sidebarView.addHandlerClick(handleClick);
  console.log("IMPORT SUCCESSFUL: sidebarController");
}

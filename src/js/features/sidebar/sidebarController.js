import sidebarView from "./sidebarView.js";
import addProductView from "../addProdduct/addProductView.js";
import * as model from "../../model.js";

export function handleClick(e) {
  // Get button
  const btn = e.target.closest("button");
  // Handle btn click
  if (btn) {
    // Add product
    if (btn.classList.contains("sidebar-options__btn-add-product"))
      addProductView.show();

    // Tabs
    if (btn.classList.contains("sidebar__tabs__tab")) {
      sidebarView.renderTab(btn, model.state);
    }
  }
}

export function init() {
  sidebarView.addHandlerClick(handleClick);

  console.log("IMPORT SUCCESSFUL: sidebarController");
}

init();

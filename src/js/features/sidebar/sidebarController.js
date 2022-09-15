import sidebarView from "./sidebarView.js";
import addProductView from "../addProdduct/addProductView.js";

export function handleClick(e) {
  // Get button
  const btn = e.target.closest("button");
  // Handle btn click
  if (btn) {
    if (btn.classList.contains("sidebar-options__btn-add-product"))
      addProductView.show();
  }
}

export function init() {
  sidebarView.addHandlerClick(handleClick);

  console.log("IMPORT SUCCESSFUL: sidebarController");
}

init();

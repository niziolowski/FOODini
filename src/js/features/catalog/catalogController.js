import catalogView from "./catalogView.js";
import addProductView from "../addProduct/addProductView.js";
import * as model from "../../model.js";

function handleClick(e) {
  // // Handle overlay click
  // if (e.target.classList.contains("overlay")) catalogView.hide();
  // Get clicked button
  const btn = e.target.closest("button");

  if (!btn) return;

  // Close btn
  if (btn.classList.contains("product-catalog-header__btn-close"))
    catalogView.hide();

  // Add btn
  if (btn.classList.contains("product-catalog-options__btn-add"))
    addProductView.show();
}

function init() {
  catalogView.addHandlerClick(handleClick);
  catalogView.show(model.state);
  console.log("IMPORT SUCCESSFUL: catalogController");
}

init();

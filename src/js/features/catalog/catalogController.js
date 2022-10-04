import catalogView from "./catalogView.js";
import * as model from "../../model.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) catalogView.hide();
  // Get clicked button
  const btn = e.target.closest("button");

  if (!btn) return;

  // Close btn
  if (btn.classList.contains("product-catalog-header__btn-close"))
    catalogView.hide();
}

function init() {
  catalogView.addHandlerClick(handleClick);
  console.log("IMPORT SUCCESSFUL: catalogController");
}

init();

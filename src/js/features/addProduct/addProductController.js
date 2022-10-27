import addProductView from "./addProductView.js";
import catalogView from "../catalog/catalogView.js";
import * as model from "../../model.js";
import { Product } from "../Product.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addProductView.hide();

  const btn = e.target.closest("button");

  if (!btn) return;

  // Close btn
  if (btn.classList.contains("add-to-catalog-content__header__btn-close"))
    addProductView.hide();
}

function handleSubmit(data) {
  // Add new product to catalog
  model.state.catalog.push(
    new Product(
      null,
      data.name,
      data.amount,
      data.unit,
      data.group,
      false,
      data.expiry
    )
  );

  // Update catalog View
  catalogView.render(model.state);

  // Close the window
  addProductView.hide();
}

function init() {
  addProductView.addHandlerClick(handleClick);
  addProductView.addHandlerSubmit(handleSubmit);
}

init();

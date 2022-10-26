import addProductView from "./addProductView.js";
import * as addProductModel from "./addProductModel.js";
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

async function handleSubmit(data) {
  try {
    console.log(data);
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

    // Upload to API
    model.uploadCatalog();

    // Update Sidebar View
    catalogView.render(model.state);

    // Close the window
    addProductView.hide();
  } catch (error) {
    console.error(error);
  }
}

function init() {
  addProductView.addHandlerClick(handleClick);
  addProductView.addHandlerSubmit(handleSubmit);
}

init();

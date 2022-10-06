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
    // Upload new product to API
    const product = await addProductModel.upload(data);

    // Add new product to storage
    model.state.catalog.push(
      new Product(
        product.id,
        product.name,
        product.amount,
        product.unit,
        product.group,
        product.bookmark,
        product.expiry
      )
    );

    // Update Sidebar View
    catalogView.render(model.state);

    // Display message

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

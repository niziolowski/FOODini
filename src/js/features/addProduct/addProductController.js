import addProductView from "./addProductView.js";
import catalogView from "../catalog/catalogView.js";
import * as model from "../../model.js";
import { Product } from "../Product.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addIngredientView.hide();

  const btn = e.target.closest("button");

  if (!btn) return;

  if (btn.classList.contains("add-to-catalog-content__header__btn-close"))
    addProductView.hide();
}

async function handleSubmit(data) {
  try {
    // // Upload new product to API
    // const product = await addProductModel.upload(data);
    // console.log(product);

    // Add new product to storage
    model.state.catalog.push(
      new Product(
        // data.id,
        undefined,
        data.name,
        data.amount,
        data.unit,
        data.group,
        false,
        data.expiry
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

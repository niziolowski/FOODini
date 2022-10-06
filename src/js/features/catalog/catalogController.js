import catalogView from "./catalogView.js";
import * as catalogModel from "./catalogModel.js";
import addProductView from "../addProduct/addProductView.js";
import * as model from "../../model.js";
import { Product } from "../Product.js";

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

  // Delete btn
  if (btn.classList.contains("js-btn-delete")) {
    // Get element id
    const element = btn.closest("tr");
    const id = +element.id.split("-")[1];
    // API delete
    const product = model.state.catalog.find((item) => item.id === id);

    product.APIdelete();

    // Delete item
    catalogModel.deleteItem(id);

    // Update view
    catalogView.render(model.state);
  }

  // Bookmark BTN
  if (btn.classList.contains("js-btn-bookmark")) {
    // get item ID
    const id = +btn.closest("tr").id.split("-")[1];

    // get product
    const product = model.state.catalog.find((item) => item.id === id);
    product.toggleBookmark();
    catalogView.render(model.state);

    // API edit
    product.APIedit();
  }
}

function init() {
  catalogView.addHandlerClick(handleClick);
  console.log("IMPORT SUCCESSFUL: catalogController");
}

init();

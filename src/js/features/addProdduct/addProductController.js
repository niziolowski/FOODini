import addProductView from "./addProductView.js";
import * as addProductModel from "./addProductModel.js";
import * as model from "../../model.js";
import sidebarView from "../sidebar/sidebarView.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addProductView.hide();

  // Get button
  const btn = e.target.closest("button");

  // Handle btn click
  if (btn) {
    if (btn.classList.contains("add-product-content__header__btn-close"))
      addProductView.hide();
  }
}

function handleAC(e) {
  function handleACevents(e) {
    // On "Escape" key (exit autocomplete)
    if (e.type === "keydown" && e.key === "Escape") addProductView.clearAC();

    // On click
    const tagName = e.target.tagName;

    if (tagName !== "LI" && tagName !== "INPUT") addProductView.clearAC();

    if (tagName === "LI") performAC(e);

    // On input (get suggestions, display suggestion list)
    if (e.type === "input") handleACinput(e);
  }

  // Listeners for autoComplete feature
  addProductView.addHandlerACevents(handleACevents);
}

function handleACinput(e) {
  const input = e.target;

  // Create suggestions list
  const suggestions = addProductModel.getSuggestions(input, model.state);

  // Render suggestions
  addProductView.renderACsuggestions(suggestions);
}

function performAC(e) {
  const productID = +e.target.dataset.productId;
  // Get clicked product object from storage database
  const productData = model.state.storage.find(
    (product) => product.id === productID
  );

  // fill the form with productData
  addProductView.updateForm(productData);
}

async function handleUpload(data) {
  try {
    const ingredient = addProductModel.createIngredientObject(
      data,
      model.state
    );

    // Add new product to storage
    model.state.storage.push(ingredient);

    // Upload new product to API
    addProductModel.upload(ingredient);

    // Recalculate recipe ingredients;

    // Update views
  } catch (error) {
    console.error(error);
  }
}

function init() {
  addProductView.addHandlerClick(handleClick);
  addProductView.addHandlerAC(handleAC);
  addProductView.addHandlerUpload(handleUpload);

  console.log("IMPORT SUCCESSFUL: addProductController");

  // testing
  // addProductView.show();
}

init();
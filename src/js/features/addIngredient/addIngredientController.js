import addIngredientView from "./addIngredientView.js";
import * as addIngredientModel from "./addIngredientModel.js";
import * as model from "../../model.js";
import sidebarView from "../sidebar/sidebarView.js";
import { Ingredient } from "../Ingredient.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addIngredientView.hide();

  // Get button
  const btn = e.target.closest("button");

  // Handle btn click
  if (btn) {
    if (btn.classList.contains("add-ingredient-content__header__btn-close"))
      addIngredientView.hide();
  }
}

function handleAC(e) {
  function handleACevents(e) {
    // On "Escape" key (exit autocomplete)
    if (e.type === "keydown" && e.key === "Escape") addIngredientView.clearAC();

    // On click
    const tagName = e.target.tagName;

    if (tagName !== "LI" && tagName !== "INPUT") addIngredientView.clearAC();

    if (tagName === "LI") performAC(e);

    // On input (get suggestions, display suggestion list)
    if (e.type === "input") handleACinput(e);
  }

  // Listeners for autoComplete feature
  addIngredientView.addHandlerACevents(handleACevents);
}

function handleACinput(e) {
  const input = e.target;

  // Create suggestions list
  const suggestions = addIngredientModel.getSuggestions(input, model.state);

  // Render suggestions
  addIngredientView.renderACsuggestions(suggestions);
}

function performAC(e) {
  const productID = +e.target.dataset.productId;

  // Get clicked product object from catalog database
  const productData = model.state.catalog.find(
    (product) => product.id === productID
  );

  // fill the form with productData
  addIngredientView.updateForm(productData);

  // exit autocomplete
  addIngredientView.clearAC();
}

async function handleUpload(data) {
  try {
    // Upload new product to API
    const ingredient = await addIngredientModel.upload(data);
    console.log(ingredient);

    // Add new product to storage
    model.state.storage.push(
      new Ingredient(
        ingredient.id,
        ingredient.name,
        ingredient.amount,
        ingredient.unit,
        ingredient.group,
        ingredient.bookmark,
        ingredient.created_at,
        ingredient.expiry
      )
    );

    // Recalculate recipe ingredients;

    // Update Sidebar View
    sidebarView.render(model.state);

    // Update views

    // Display message
  } catch (error) {
    console.error(error);
  }
}

function init() {
  addIngredientView.addHandlerClick(handleClick);
  addIngredientView.addHandlerAC(handleAC);
  addIngredientView.addHandlerUpload(handleUpload);

  console.log("IMPORT SUCCESSFUL: addIngredientController");

  // testing
  // addIngredientView.show();
}

init();

import addRecipeView from "./addRecipeView.js";
import * as addProductController from "../addProduct/addProductController.js";
import addProductView from "../addProduct/addProductView.js";
import * as autoCompleteController from "../autoComplete/autoCompleteController.js";
import addProductView from "../addProduct/addProductView.js";

function handleClick(e) {
  e.preventDefault();
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addRecipeView.hide();

  const btn = e.target.closest("button");

  if (!btn) return;

  // BTN close
  if (btn.classList.contains("add-recipe-content__header__btn-close"))
    addRecipeView.hide();

  // § INGREDIENTS

  // BTN add ingredient
  if (btn.classList.contains("add-recipe__btn-add-ingredient")) {
    addRecipeView.addIngredient();
  }

  // BTN delete ingredient
  if (btn.classList.contains("add-recipe__btn-delete-ingredient")) {
    addRecipeView.deleteListItem(btn);
  }

  // § SPICES

  // BTN add ingredient
  if (btn.classList.contains("add-recipe__btn-add-spice")) {
    addRecipeView.addSpice();
  }

  // BTN delete ingredient
  if (btn.classList.contains("add-recipe__btn-delete-spice")) {
    addRecipeView.deleteListItem(btn);
  }
}

// Handler for AutoCompletion
function handleAC(e) {
  // Get clicked suggestion
  const target = e.target.closest(".add-recipe__ingredient");
  let data = autoCompleteController.autoComplete(e);

  if (!data) return;

  // Open "add to catalog" window
  if (data === "new") {
    addProductController.addNewProduct();
  }

  // Get data from the add to catalog form

  addRecipeView.updateForm(target, data);
}

function init() {
  addRecipeView.addHandlerClick(handleClick);
  addRecipeView.addHandlerAC(handleAC);

  //   for dev
  addRecipeView.show();
}

init();

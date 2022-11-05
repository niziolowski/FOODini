import addRecipeView from "./addRecipeView.js";
import * as addProductController from "../addProduct/addProductController.js";
import * as autoCompleteController from "../autoComplete/autoCompleteController.js";
import * as addRecipeModel from "./addRecipeModel.js";
import sidebarView from "../sidebar/sidebarView.js";
import * as model from "../../model.js";

function handleClick(e) {
  // e.preventDefault();
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

function handleSubmit(data) {
  // Add new recipe
  addRecipeModel.addRecipe(data);
  // Hide the add recipe window
  addRecipeView.hide();
  //TODO: Clear the form
  addRecipeView.clearForm();

  // Update sidebar view
  sidebarView.render(model.state);
}

// Handler for AutoCompletion
function handleAC(e) {
  const key = e.key;

  if (key === "Enter") {
    e.preventDefault();
  }

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
  addRecipeView.addHandlerSubmit(handleSubmit);
  addRecipeView.addHandlerClick(handleClick);
  addRecipeView.addHandlerAC(handleAC);
}

init();

import addRecipeView from "./addRecipeView";
import * as autoCompleteController from "../autoComplete/autoCompleteController.js";

function handleClick(e) {
  e.preventDefault();
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addRecipeView.hide();

  const btn = e.target.closest("button");

  if (!btn) return;

  // BTN close
  if (btn.classList.contains("add-recipe-content__header__btn-close"))
    addRecipeView.hide();

  // BTN add ingredient
  if (btn.classList.contains("add-recipe__btn-add-ingredient")) {
    addRecipeView.addIngredient();
  }
}

// Handler for AutoCompletion
function handleAC(e) {
  // Get clicked suggestion
  const target = e.target.closest(".add-recipe__ingredient");
  const data = autoCompleteController.autoComplete(e);
  if (!data) return;

  // Open "add to catalog" window
  if (data === "new") {
    console.log("ADD NEW PRODUCT TO CATALOG");
  }

  addRecipeView.updateForm(target, data);
}

function init() {
  addRecipeView.addHandlerClick(handleClick);
  addRecipeView.addHandlerAC(handleAC);

  //   for dev
  addRecipeView.show();
}

init();

import addIngredientView from "./addIngredientView.js";
import * as addIngredientModel from "./addIngredientModel.js";
import * as model from "../../model.js";
import sidebarView from "../sidebar/sidebarView.js";
import { Ingredient } from "../Ingredient.js";
import addProductView from "../addProduct/addProductView.js";
import * as shoppingListModel from "../shoppingList/shoppingListModel.js";
import shoppingListView from "../shoppingList/shoppingListView.js";
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
    const li = e.target.closest("li");
    let input = e.target.closest("input");

    // On input (get suggestions, display suggestion list)
    if (input && input.value.length > 0) handleACinput(e);
    // On "Escape" key (exit autocomplete)
    if (e.type === "keydown" && e.key === "Escape") addIngredientView.clearAC();

    // On focusout
    if (!li && !input) addIngredientView.clearAC();

    // Suggestion click
    if (li) {
      if (li.classList.contains("suggestions__btn-new")) {
        addProductView.show();
      } else {
        performAC(e);
      }
    }
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

function handleSubmit(data) {
  // Create new ingredient
  const ingredient = new Ingredient(
    null,
    data.name,
    data.amount,
    data.unit,
    data.group,
    data.bookmark,
    data.date,
    data.expiry
  );

  // Add new ingredient to storage
  model.state.storage.push(ingredient);

  // Recalculate recipe ingredients
  model.recalculateRecipes();

  // TEMPORARY SOLUTION FOR MISCALCULATION:
  // When deleting meal, restore Ingredients for all items and recalculate again;
  model.state.plan.weeks.forEach((week) =>
    week.days.forEach((day) =>
      day.meals.forEach((meal) => {
        model.restoreIngredients(meal);
        meal.calcIngredients();
      })
    )
  );

  shoppingListModel.recalcShoppingList();

  // Update Sidebar View
  sidebarView.render(model.state);
  shoppingListView.render(model.state.shoppingList);
}

function init() {
  addIngredientView.addHandlerClick(handleClick);
  addIngredientView.addHandlerAC(handleAC);
  addIngredientView.addHandlerSubmit(handleSubmit);

  console.log("IMPORT SUCCESSFUL: addIngredientController");

  // testing
  // addIngredientView.show();
}

init();

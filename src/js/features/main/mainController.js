import mainView from "./mainView.js";
import * as mainModel from "./mainModel.js";
import * as model from "../../model.js";
import sidebarView from "../sidebar/sidebarView.js";
import shoppingListView from "../shoppingList/shoppingListView.js";
import * as shoppingListModel from "../shoppingList/shoppingListModel.js";

//TODO: Refactor this. Move to view and model what you can. Think through.
function handleDrop(e) {
  // 1. If not dropping on the list, just clean indicator

  // Clear Indication on all days
  mainView.clearDaysIndication();

  const list = e.target.closest(".plan-day-list");
  if (!list) return;

  // 2. Get data

  // look for placeholder when dropping a new element. The placholder will be created by dragOver handler
  const placeholder = list.querySelector(".placeholder");
  // Index of dropped item for reference
  const targetIndex = [...list.children].indexOf(placeholder);

  // Get target day for reference
  const targetDay = list.id;

  // Get drag data
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));

  // Get type of draggable
  const type = data.id.split("-")[0] === "i" ? "ingredient" : "recipe";

  // Get dragged element ID
  const id = +data.id.split("-")[1];
  if (!id) return;

  let meal;
  // Get Recipe object
  if (type === "recipe") meal = model.getRecipe(id);

  // Get Ingredient object
  if (type === "ingredient") meal = model.getIngredient(id);

  // § MODEL

  // 1. Update state

  // Remove source item
  if (data.mode === "move") {
    // Get meal object
    const dayObj = model.getDay(data.day);
    const mealObj = dayObj.meals[data.index];

    // 1. Recover storage move to model
    model.restoreIngredients(mealObj);
    mainModel.removeMeal(data.day, data.index);

    if (model.state.plan.activeWeek.sync) {
      // 2. delete from list
      shoppingListModel.recalcShoppingList();
    }
  }

  // Add new item
  const day = model.getDay(targetDay);
  const newMeal = day.addMeal(meal, targetIndex);

  // Recalculate recipes
  model.recalculateRecipes();

  // Update View
  sidebarView.render(model.state);
  mainView.render(model.state.plan.activeWeek, model.state);

  // § Shopping list synchronisation
  if (model.state.plan.activeWeek.sync) {
    shoppingListModel.recalcShoppingList();

    // Update view
    shoppingListView.render(model.state.shoppingList);
  }
}

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  // Delete meal
  if (btn.classList.contains("plan-day-list__item__btn-delete")) {
    // get dayID
    const day = btn.closest(".plan-day-list");
    const meal = btn.closest(".plan-day-list__item");
    const index = [...day.children].indexOf(meal);

    // Get meal object
    const dayObj = model.getDay(day.id);
    const mealObj = dayObj.meals[index];

    // 1. Recover storage
    model.restoreIngredients(mealObj);

    // 2. Delete meal
    mainModel.removeMeal(day.id, index);

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

    // If shopping list sync is on, recalculate shopping list
    if (model.state.plan.activeWeek.sync) {
      shoppingListModel.recalcShoppingList();
    }

    // 3. Recalculate recipes
    model.state.recipes.forEach((recipe) => recipe.calcIngredients());

    // 4. Update View
    mainView.render(model.state.plan.activeWeek, model.state);
    sidebarView.render(model.state);
    shoppingListView.render(model.state.shoppingList);
  }
}

export function init() {
  // Set current week
  mainModel.setCurrentWeek();
  // Set names and delete old weeks
  mainModel.setWeekNames();

  mainView.addHandlerDragAndDrop(handleDrop);
  mainView.addHandlerClick(handleClick);

  // Render plan
  mainView.render(model.state.plan.currentWeek, model.state);
}

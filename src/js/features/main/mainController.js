import mainView from "./mainView.js";
import * as mainModel from "./mainModel.js";
import * as model from "../../model.js";
import sidebarView from "../sidebar/sidebarView.js";

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
  if (data.mode === "move") mainModel.removeMeal(data.day, data.index);

  // Add new item
  const day = model.getDay(targetDay);
  day.addMeal(meal, targetIndex);

  // Recalculate recipes
  model.state.recipes.forEach((recipe) => recipe.calcIngredients());

  // Update View
  sidebarView.render(model.state);
  mainView.render(model.state.plan.activeWeek, model.state);

  //TODO: UPDATE API
  // 2. Update API
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

    // 1. Recover storage move to model
    model.restoreIngredients(mealObj);

    // 2. Delete meal
    mainModel.removeMeal(day.id, index);

    // 3. Recalculate recipes
    model.state.recipes.forEach((recipe) => recipe.calcIngredients());

    // 4. Update View
    mainView.render(model.state.plan.activeWeek, model.state);
    sidebarView.render(model.state);
  }
}

function init() {
  mainView.addHandlerDragAndDrop(handleDrop);
  mainView.addHandlerClick(handleClick);

  // Set current week
  mainModel.setCurrentWeek();

  // Render plan
  mainView.render(model.state.plan.currentWeek, model.state);
}
init();

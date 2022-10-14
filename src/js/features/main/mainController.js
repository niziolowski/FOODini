import mainView from "./mainView.js";
import * as mainModel from "./mainModel.js";
import * as model from "../../model.js";

//TODO: Refactor this. Move to view what you can. Think through.
function handleDragAndDrop(e) {
  // Drop
  if (e.type === "drop") handleDrop(e);
}

function handleDrop(e) {
  // § VIEW

  // If not dropping on the list, just clean indicator
  const list = e.target.closest(".plan-day-list");

  // Clear Indication on all days
  const days = document.querySelectorAll(".plan-day");
  days.forEach((day) => day.classList.remove("drag-over"));

  if (!list) return;

  // look for placeholder when dropping a new element
  const placeholder = list.querySelector(".placeholder");

  // Get dragged element ID
  let id = e.dataTransfer.getData("text/plain");
  if (!id) return;
  id = id.split("-"); // ID have type and number in it. This splits it into an array

  // Get type of draggable
  const type = id[0] === "i" ? "ingredient" : "recipe";

  let meal;

  // For recipe
  if (type === "recipe") {
    // Get recipe element
    meal = model.getRecipe(+id[1]);
  }

  // For ingredient
  if (type === "ingredient") {
    // Get Ingredient element
    meal = model.getIngredient(+id[1]);
  }

  // Generate markup
  const newElement = mainView.generateMarkupMeal(meal, model.state);

  // Insert markup in the place of placeholder
  placeholder.insertAdjacentHTML("beforebegin", newElement);

  // Index of dropped item for reference
  const targetIndex = [...list.children].indexOf(placeholder) - 1;

  // remove placeholder if present
  if (placeholder) placeholder.remove();

  // get svg icons
  feather.replace();

  // § MODEL

  // Get target day
  const targetDay = model.state.plan.currentWeek.days.find(
    (day) => day.name === list.id
  );
  // Get target index
  targetDay.meals.splice(targetIndex, 0, meal);
}

function init() {
  mainView.addHandlerDragAndDrop(handleDragAndDrop);

  // Set current week
  mainModel.setCurrentWeek();

  // Render plan
  mainView.render(model.state.plan.currentWeek, model.state);
}
init();

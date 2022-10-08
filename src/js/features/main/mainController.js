import mainView from "./mainView.js";
import * as model from "../../model.js";

//TODO: Refactor this. Move to view what you can. Think through.
function handleDragAndDrop(e) {
  // Drop
  if (e.type === "drop") handleDrop(e);
}

function handleDrop(e) {
  // If not dropping on the list, do nothing
  const list = e.target.closest(".plan-day-list");
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

  // remove placeholder if present
  if (placeholder) placeholder.remove();

  // get svg icons
  feather.replace();
}

function init() {
  mainView.addHandlerDragAndDrop(handleDragAndDrop);
  mainView.render(model.state.plan.currentWeek, model.state);
}
init();

import shoppingListView from "./shoppingListView.js";
import * as shoppingListModel from "./shoppingListModel.js";
import * as model from "../../model.js";
import * as autoCompleteController from "../autoComplete/autoCompleteController.js";
import * as addProductController from "../addProduct/addProductController.js";
import sidebarView from "../sidebar/sidebarView.js";

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  // Btn "add item"
  if (btn.classList.contains("shopping-list__btn-add")) {
    e.preventDefault();
    // Render
    shoppingListView.renderNewItem();
  }

  // Btn "delete item"
  if (btn.classList.contains("shopping-list-item__btn-delete")) {
    e.preventDefault();
    // Remove from state
    // Get list mode
    const mode = btn.closest("ul").id.split("-")[1];

    // Get target name
    const name = btn.parentElement.querySelector(
      ".shopping-list-item__name"
    ).value;

    if (!name || name === "undefined") {
      shoppingListView.removeItem(btn);
    }

    if (name) {
      // Get item object
      const item = [
        model.state.shoppingList[mode].find((item) => item.name === name),
      ];

      shoppingListModel.deleteItem(mode, item);
      shoppingListView.removeItem(btn);
    }
  }

  // Btn "submit"
  if (btn.classList.contains("shopping-list__btn-submit")) {
    e.preventDefault();

    shoppingListModel.submit();

    sidebarView.render(model.state);
    shoppingListView.render(model.state.shoppingList);
  }
}

// Handler for AutoCompletion
function handleAC(e) {
  const key = e.key;

  if (key === "Enter") {
    e.preventDefault();
  }
  // Get clicked suggestion
  const target = e.target.closest(".shopping-list-item");
  let data = autoCompleteController.autoComplete(e);
  if (!data) return;

  // Open "add to catalog" window
  if (data === "new") {
    addProductController.addNewProduct();
  }
  // Update view
  shoppingListView.updateForm(target, data);

  console.log(data);
  // Add to state
  shoppingListModel.addItem("user", [data]);
}

// On input get item, structure the data and change state
function handleInput(e) {
  // Get item data
  const data = shoppingListModel.getItemDataFromInput(e);

  console.log(data);
  // Change state
  shoppingListModel.updateItem(data);
}

export function init() {
  console.log("IMPORT SUCCESFUL: shoppingListController");
  shoppingListView.addHandlerClick(handleClick);
  shoppingListView.addHandlerAC(handleAC);
  shoppingListView.addHandlerInput(handleInput);
  shoppingListView.render(model.state.shoppingList);
}

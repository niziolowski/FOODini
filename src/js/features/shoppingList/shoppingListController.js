import shoppingListView from "./shoppingListView.js";
import * as shoppingListModel from "./shoppingListModel.js";
import * as model from "../../model.js";

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  // Btn "add item"
  if (btn.classList.contains("shopping-list__btn-add")) {
    e.preventDefault();
    // Render
    shoppingListView.renderNewItem();

    // Add to state
  }

  // Btn "delete item"
  if (btn.classList.contains("shopping-list-item__btn-delete")) {
    // Remove from state
    // Get list mode
    const mode = btn.closest("ul").id.split("-")[1];

    // Get target name
    const name = btn.parentElement.querySelector(
      ".shopping-list-item__name"
    ).value;

    // Get item object
    const item = [
      model.state.shoppingList[mode].find((item) => item.name === name),
    ];

    shoppingListModel.deleteItem(mode, item);
    shoppingListView.removeItem(btn);
  }
}

export function init() {
  console.log("IMPORT SUCCESFUL: shoppingListController");
  shoppingListView.addHandlerClick(handleClick);

  shoppingListView.render(model.state.shoppingList);
}

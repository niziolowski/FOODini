import shoppingListView from "./shoppingListView.js";

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  // Btn "add item"
  if (btn.classList.contains("shopping-list__btn-add")) {
    // Render
    shoppingListView.renderNewItem();

    // Add to state
  }

  // Btn "delete item"

  if (btn.classList.contains("shopping-list-item__btn-delete")) {
    shoppingListView.removeItem(btn);

    // Remove from state
  }
}

function init() {
  console.log("IMPORT SUCCESFUL: shoppingListController");
  shoppingListView.addHandlerClick(handleClick);

  shoppingListView.show(); //* For testing only
}

init();

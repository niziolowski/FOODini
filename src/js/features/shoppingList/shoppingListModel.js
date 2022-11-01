import * as model from "../../model.js";

export function addItem(mode, ingredients) {
  if (mode === "sync") {
    ingredients.forEach((ing) => {
      // 1. Look for ingredient in sync list
      const match = model.state.shoppingList.sync.find(
        (item) => item.name === ing.name
      );

      // 2. If no matches, add to list
      if (!match) model.state.shoppingList.sync.push(ing);

      // 3. if there is a match, add amount to the position
      if (match) {
        match.amount += ing.amount;
      }
    });
  }
}

export function deleteItem(mode, ingredients) {
  if (mode === "sync") {
    ingredients.forEach((ing) => {
      // Find item in the list
      const item = model.state.shoppingList.sync.find(
        (item) => item.name === ing.name
      );
      if (!item) return;

      // Subtract from the amount
      item.amount -= ing.amount;

      // get target index
      const index = model.state.shoppingList.sync.indexOf(item);

      // If 0 amount left, delete item
      if (item.amount === 0) model.state.shoppingList.sync.splice(index, 1);
    });
  }
}

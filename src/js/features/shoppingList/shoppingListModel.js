import * as model from "../../model.js";
import { Ingredient } from "../Ingredient.js";

export function getItemDataFromInput(e) {
  const itemEl = e.target.parentElement;
  const checkbox = itemEl.querySelector(
    ".shopping-list-item__checkbox"
  ).checked;
  const name = itemEl.querySelector(".shopping-list-item__name").value;
  const amount = itemEl.querySelector(".shopping-list-item__amount").value;
  const unit = itemEl.querySelector(".shopping-list-item__unit").value;

  return {
    checkbox,
    name,
    amount,
    unit,
  };
}

export function updateItem(data) {
  // get item
  const item = model.state.shoppingList.user.find(
    (item) => item.name === data.name
  );

  // update data
  item.checkbox = data.checkbox;
  item.name = data.name;
  item.amount = data.amount;
  item.unit = data.unit;
}

export function addItem(mode, ingredients) {
  // SYNC
  if (mode === "sync") {
    ingredients.forEach((ing) => {
      // 1. Look for ingredient in sync list
      const match = model.state.shoppingList.sync.find(
        (item) => item.name === ing.name
      );

      // 2. If no matches, add to list
      if (!match)
        model.state.shoppingList.sync.push(
          new Ingredient(
            ing.id,
            ing.name,
            ing.amount,
            ing.unit,
            ing.group,
            ing.bookmark,
            ing.purchaseDate,
            ing.expiry
          )
        );

      // 3. if there is a match, add amount to the position
      if (match) {
        match.amount += ing.amount;
      }
    });
  }

  // USER
  if (mode === "user") {
    ingredients.forEach((ing) => {
      // 1. Look for ingredient in sync list
      const match = model.state.shoppingList.user.find(
        (item) => item.name === ing.name
      );

      // 2. If no matches, add to list
      if (!match)
        model.state.shoppingList.user.push(
          new Ingredient(
            ing.id,
            ing.name,
            ing.amount,
            ing.unit,
            ing.group,
            ing.bookmark,
            ing.purchaseDate,
            ing.expiry
          )
        );

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
  if (mode === "user") {
    ingredients.forEach((ing) => {
      // if(!ing)
      // Find item in the list
      const item = model.state.shoppingList.user.find(
        (item) => item.name === ing.name
      );
      if (!item) return;

      // Subtract from the amount
      item.amount -= ing.amount;

      // get target index
      const index = model.state.shoppingList.user.indexOf(item);

      // If 0 amount left, delete item
      if (item.amount === 0) model.state.shoppingList.user.splice(index, 1);
    });
  }
}

export function recalcShoppingList() {
  // Clear shopping list
  model.state.shoppingList.sync = [];

  model.state.plan.weeks.forEach((week) => {
    // If week sync is ON, add missing items to the list
    if (week.sync)
      week.days.forEach((day) =>
        day.meals.forEach((meal) => addItem("sync", meal.missing))
      );
  });
}

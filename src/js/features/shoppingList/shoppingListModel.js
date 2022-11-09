import * as model from "../../model.js";
import { Ingredient } from "../Ingredient.js";
import shoppingListModel from "../shoppingList/shoppingListModel.js";

export function getItemDataFromInput(e) {
  const itemEl = e.target.parentElement;
  // Get mode
  const mode = e.target.name.split("-")[0];
  const checkbox = itemEl.querySelector(
    ".shopping-list-item__checkbox"
  ).checked;
  const name = itemEl.querySelector(".shopping-list-item__name").value;
  const amount = itemEl.querySelector(".shopping-list-item__amount").value;
  const unit = itemEl.querySelector(".shopping-list-item__unit").value;

  return {
    checkbox,
    name,
    amount: +amount,
    unit,
    mode,
  };
}

export function updateItem(data) {
  // get item
  const item = model.state.shoppingList[data.mode].find(
    (item) => item.name === data.name
  );

  // update data
  item.checkbox = data.checkbox;
  item.name = data.name;
  item.amount = +data.amount;
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
            null,
            ing.name,
            +ing.amount,
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
            +ing.amount,
            ing.unit,
            ing.group,
            ing.bookmark,
            ing.purchaseDate,
            ing.expiry
          )
        );

      // 3. if there is a match, add amount to the position
      if (match) {
        match.amount += +ing.amount;
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

export function deleteItemByID(id) {
  // Find item in the lists
  const sync = model.state.shoppingList.sync.find((item) => item.id === id);
  const user = model.state.shoppingList.user.find((item) => item.id === id);

  if (sync) {
    // get target index
    const index = model.state.shoppingList.sync.indexOf(sync);
    // delete item
    model.state.shoppingList.sync.splice(index, 1);
  }

  if (user) {
    // get target index
    const index = model.state.shoppingList.user.indexOf(user);
    // delete item
    model.state.shoppingList.user.splice(index, 1);
  }
}

export function submit() {
  // Get all shopping list items
  const data = [
    ...model.state.shoppingList.sync,
    ...model.state.shoppingList.user,
  ];

  // Filter out unchecked items
  const ingredients = data.filter((item) => item.checkbox);

  // Add same ingredients together
  const uniqueIngs = ingredients.map((ing) => ing.name);
  const ingSet = new Set(uniqueIngs);

  const sameIngs = [...ingSet].map((name) =>
    ingredients.filter((ing) => ing.name === name)
  );

  const groupedIngs = sameIngs.map((arr) => {
    // if only one ingredient in a group, just return it
    if (arr.length === 1) return arr[0];

    // Get the sum of the same ingredients
    let sumAmount = arr.reduce((acc, cur) => acc.amount + cur.amount);

    // Return ingredient with summed up amount
    arr[0].amount = sumAmount;
    return arr[0];
  });

  // Delete checked items from shopping-list
  ingredients.forEach((ing) => deleteItemByID(ing.id));

  // Add to storage
  groupedIngs.forEach((ing) =>
    model.addToStorage(
      new Ingredient(
        null,
        ing.name,
        +ing.amount,
        ing.unit,
        ing.group,
        ing.bookmark,
        null,
        ing.expiry
      )
    )
  );

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

  recalcShoppingList();
}

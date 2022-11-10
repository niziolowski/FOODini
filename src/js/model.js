import { AJAX } from "./helpers.js";
import { API_URL } from "./config.js";
import { Ingredient } from "./features/Ingredient.js";
import { Recipe } from "./features/Recipe.js";
import { Product } from "./features/Product.js";
import { Day } from "./features/Day.js";
import { Week } from "./features/Week.js";
import { Meal } from "./features/Meal.js";
// § STATE

export const state = {
  colorTheme: [
    { property: "--bg-color", value: "#f5f5f5" },
    { property: "--accent-color", value: "#516e94" },
    { property: "--font-color", value: "#333333" },
    { property: "--tag-1-color", value: "#ffe047" },
    { property: "--tag-2-color", value: "#7ab4ff" },
    { property: "--tag-3-color", value: "#dd6b6b" },
  ],
  tags: {
    storage: ["świeże", "suche", "mrożone"],
    recipes: ["śniadanie", "obiad", "kolacja"],
  },
  recipes: [],
  storage: [],
  catalog: [],
  plan: {
    activeWeek: {},
    currentWeek: {},
    weeks: [],
  },
  shoppingList: {
    sync: [],
    user: [],
  },
};

export function getRecipe(id) {
  return state.recipes.find((recipe) => recipe.id === id);
}

export function getIngredient(id) {
  return state.storage.find((recipe) => recipe.id === id);
}

export function getDay(id) {
  return state.plan.activeWeek.days.find((day) => day.name === id);
}

export function deleteIngredient(ing) {
  // Get index of item to delete
  const index = state.storage.indexOf(ing);

  // Delete the item
  state.storage.splice(index, 1);
}

export function deleteWeek(target) {
  // Find week index in plan
  const index = state.plan.weeks.indexOf(target);
  // Delete week
  state.plan.weeks.splice(index, 1);
}

// Add the ingredients back from plan meal
export function restoreIngredients(meal) {
  // Get used Ingredients
  const ingredients = meal.used;

  ingredients.forEach((ing) => {
    // Try to find ingredient in storage
    const item = state.storage.find((item) => item.id === ing.id);

    // Add used amount back to storage
    if (item) item.amount += ing.amount;

    // If it doesn't exist, just move it to state
    if (!item) {
      state.storage.push(ing);
    }
  });
}

// § SIMPLIFIED API (upload whole state to bypass requests limit)
export async function APIupload() {
  try {
    // Create object
    const data = {
      username: "Basia",
      data: state,
    };

    const res = await AJAX(API_URL, data);
    console.log("State uploaded");
  } catch (error) {
    console.error(error);
  }
}

export async function APIdownload() {
  try {
    const res = await AJAX(API_URL);
    const data = res.data;

    if (!data) return;

    // Instantiate objects with methods
    generateCatalog(data.catalog);
    generateStorage(data.storage);
    generateRecipes(data.recipes);
    generatePlan(data.plan.weeks);
    generateShoppingList(data.shoppingList);
    loadColorTheme(data.colorTheme);

    console.log(state);
    return data;
  } catch (error) {
    throw error;
  }
}

// § Convert API data to class instances
function generateShoppingList(data) {
  // Generate sync ingredients
  const syncIngs = data.sync.map(
    (ing) =>
      new Ingredient(
        ing.id,
        ing.name,
        ing.amount,
        ing.unit,
        ing.group,
        ing.bookmark,
        ing.purchaseDate,
        ing.expiry,
        ing.checkbox
      )
  );

  const userIngs = data.user.map(
    (ing) =>
      new Ingredient(
        ing.id,
        ing.name,
        ing.amount,
        ing.unit,
        ing.group,
        ing.bookmark,
        ing.purchaseDate,
        ing.expiry,
        ing.checkbox
      )
  );

  // Overwrite state shopping list
  state.shoppingList.sync = syncIngs;
  state.shoppingList.user = userIngs;
}

function generateCatalog(data) {
  // Generate product objects
  const catalog = data.map(
    (ing) =>
      new Product(
        ing.id,
        ing.name,
        ing.amount,
        ing.unit,
        ing.group,
        ing.bookmark,
        ing.expiry
      )
  );

  // Overwrite state catalog
  state.catalog = catalog;
}

function generateStorage(data) {
  // Generate ingredient objects
  const storage = data.map(
    (ing) =>
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

  // Overwrite state storage
  state.storage = storage;
}

function generateRecipes(data) {
  const recipes = data.map((rec) => {
    // Generate recipe instances
    const ingredients = rec.ingredients.map(
      (ing) =>
        new Ingredient(
          ing.id,
          ing.name,
          ing.amount,
          ing.unit,
          ing.group,
          ing.bookmark,
          ing.date,
          ing.expiry
        )
    );

    // Create recipe instances
    return new Recipe(
      rec.id,
      rec.title,
      rec.group,
      rec.description,
      ingredients,
      rec.spices,
      rec.difficulty,
      rec.bookmark,
      rec.imageURL
    );
  });

  // Overwrite state recipes
  state.recipes = recipes;
}

function generatePlan(data) {
  // guard closure
  if (data.length === 0) return;

  // generate week instances
  const weeks = data.map((week) => {
    // Create days for the week
    const days = week.days.map((day) => {
      const meals = day.meals.map((meal) => new Meal(meal));
      return new Day(day.name, meals);
    });

    //
    return new Week(
      week.dateRange.startDate,
      week.dateRange.endDate,
      days,
      week.id,
      week.sync
    );
  });
  state.plan.weeks = weeks;
  state.plan.weeks.sort(
    (a, b) =>
      new Date(a.dateRange.startDate).getTime() -
      new Date(b.dateRange.startDate).getTime()
  );
}

function loadColorTheme(colorTheme) {
  state.colorTheme = colorTheme;
}

// Recalculate recipe ingredients
export function recalculateRecipes() {
  state.recipes.forEach((recipe) => recipe.calcIngredients());
}

// Add new ingredient to storage
export function addToStorage(ingredient) {
  state.storage.push(ingredient);
}

// Use with caution
export function clearStorage() {
  state.storage = [];
}

import { AJAX } from "./helpers.js";
import {
  API_URL_STORAGE,
  API_URL_RECIPES,
  API_URL_CATALOG,
  API_URL_PLAN,
  API_URL,
} from "./config.js";
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

export async function loadCatalog() {
  try {
    const data = await AJAX(API_URL_CATALOG);
    data.content.forEach((ing) => {
      state.catalog.push(
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
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadStorage() {
  try {
    const data = await AJAX(API_URL_STORAGE);
    data.content.forEach((ing) => {
      state.storage.push(
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
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadRecipes() {
  try {
    const data = await AJAX(API_URL_RECIPES);
    data.content.forEach((rec) => {
      // Create ingredient instances
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
      state.recipes.push(
        new Recipe(
          rec.id,
          rec.name,
          rec.group,
          rec.description,
          ingredients,
          rec.spices,
          rec.difficulty,
          rec.bookmark,
          rec.image_url
        )
      );
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadPlan() {
  try {
    const data = await AJAX(API_URL_PLAN);

    if (data.content.length === 0) return;
    data.content.forEach((week) => {
      // Create days for the week
      const days = week.days.map((day) => {
        const meals = day.meals.map((meal) => new Meal(meal));
        return new Day(day.name, meals);
      });

      state.plan.weeks.push(
        new Week(
          week.dateRange.startDate,
          week.dateRange.endDate,
          days,
          week.id,
          week.sync
        )
      );
    });
    state.plan.weeks.sort(
      (a, b) =>
        new Date(a.dateRange.startDate).getTime() -
        new Date(b.dateRange.startDate).getTime()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadState() {
  try {
    const plan = await loadPlan();
    await loadStorage();
    await loadRecipes();
    await loadCatalog();
    console.log(`LOADED STATE FROM API:`);
    console.log(state);
    return plan;
  } catch (error) {
    throw error;
  }
}

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

// Add the ingredients back from planned meal
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

export async function uploadCatalog() {
  try {
    // Create object
    const data = {
      name: "catalog",
      content: state.catalog,
    };

    const res = await AJAX(API_URL_CATALOG, data);
  } catch (error) {
    console.error(error);
  }
}
export async function uploadPlan() {
  try {
    // Create object
    const data = {
      name: "plan",
      content: state.plan.weeks,
    };

    const res = await AJAX(API_URL_PLAN, data);
  } catch (error) {
    console.error(error);
  }
}
export async function uploadStorage() {
  try {
    // Create object
    const data = {
      name: "storage",
      content: state.storage,
    };

    const res = await AJAX(API_URL_STORAGE, data);
  } catch (error) {
    console.error(error);
  }
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

    console.log(state);
    return data;
  } catch (error) {
    throw error;
  }
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

export function addToShoppingList(mode, ingredients) {
  if (mode === "sync") {
    // ingredients.forEach((ing) => state.shoppingList.sync.push(ing));
    // console.log(state.shoppingList);
    ingredients.forEach((ing) => {
      // 1. Look for ingredient in sync list
      const match = state.shoppingList.sync.find(
        (item) => item.name === ing.name
      );

      // 2. If no matches, add to list
      if (!match) state.shoppingList.sync.push(ing);

      // 3. if there is a match, add amount to the position
      if (match) {
        match.amount += ing.amount;
      }
    });
  }
}

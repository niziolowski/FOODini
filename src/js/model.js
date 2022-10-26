import { AJAX } from "./helpers.js";
import {
  API_URL_STORAGE,
  API_URL_RECIPES,
  API_URL_CATALOG,
  API_URL_PLAN,
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
  shoppingList: [
    {
      id: 855584,
      name: "Jajka",
      amount: 6,
      unit: "szt.",
      group: "świeże",
      bookmark: true,
      purchaseDate: 1666742400000,
      expiry: "14",
      daysLeft: 13,
    },
  ],
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
          week.id
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

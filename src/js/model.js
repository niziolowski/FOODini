import { AJAX, calcDaysLeft } from "./helpers.js";
import { API_URL_STORAGE, API_URL_RECIPES } from "./config.js";
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
  storage: [],
  recipes: [],
};

import { Ingredient } from "./features/Ingredient.js";

export async function loadStorage() {
  try {
    const data = await AJAX(API_URL_STORAGE);
    data.forEach((ing) => {
      const ingredient = {
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        group: ing.group,
        bookmark: ing.bookmark,
        createdAt: ing.created_at,
        expiry: ing.expiry,
        daysLeft:
          ing.expiry - calcDaysLeft(ing.created_at, new Date().getTime()),
      };

      // state.storage.push(ingredient);
      state.storage.push(
        new Ingredient(
          ing.id,
          ing.name,
          ing.amount,
          ing.unit,
          ing.group,
          ing.bookmark,
          ing.created_at,
          ing.expiry
        )
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function loadRecipes() {
  try {
    const data = await AJAX(API_URL_RECIPES);
    data.forEach((rec) => {
      const recipe = {
        id: rec.id,
        bookmark: rec.bookmark,
        createdAt: rec.created_at,
        description: rec.description,
        difficulty: rec.difficulty,
        group: rec.group,
        imageUrl: rec.image_url,
        ingredients: rec.ingredient,
        title: rec.name,
      };
      state.recipes.push(recipe);
    });
  } catch (error) {
    throw error;
  }
}

export async function loadState() {
  try {
    await loadStorage();
    await loadRecipes();
    console.log(`LOADED STATE FROM API:`);
    console.log(state);
  } catch (error) {
    throw error;
  }
}

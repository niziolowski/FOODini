import { AJAX } from "../../helpers";
import { API_URL_STORAGE } from "../../config.js";

export function getSuggestions(input, state) {
  // Get input value
  const value = input.value.toLowerCase();
  // Create suggestions list
  const suggestions = [];
  // Compare products to input, add to suggestions if matches
  state.storage.forEach((product) => {
    const productName = product.name.toLowerCase();
    if (productName.startsWith(value)) suggestions.push(product);
  });

  return suggestions;
}

export function createIngredientObject(data, state) {
  const id = state.storage.length + 1;

  const ingredient = {
    appID: id,
    createdAt: new Date(data.date).getTime(),
    name: data.name,
    amount: +data.amount,
    unit: data.unit,
    expiry: +data.expiry,
    bookmark: false,
    group: data.group,
    daysLeft: +data.expiry,
  };

  return ingredient;
}

export async function upload(ingredient) {
  try {
    // Format ingredient object for API
    const ingredientFormated = {
      app_id: ingredient.appID,
      created_at: ingredient.createdAt,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      expiry: ingredient.expiry,
      bookmark: ingredient.bookmark,
      group: ingredient.group,
    };

    // Upload
    await AJAX(`${API_URL_STORAGE}`, ingredientFormated);
  } catch (error) {
    throw error;
  }
}

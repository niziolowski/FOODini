import { AJAX } from "../../helpers";
import { API_URL_STORAGE } from "../../config.js";
import * as model from "../../model.js";

export function getSuggestions(input, state) {
  // Get input value
  const value = input.value.toLowerCase();
  // Create suggestions list
  const suggestions = [];

  // Compare products to input, add to suggestions if matches
  state.catalog.forEach((product) => {
    const productName = product.name.toLowerCase();
    if (productName.startsWith(value)) suggestions.push(product);
  });

  return suggestions;
}

export async function upload(data) {
  try {
    // Format ingredient object for API

    const ingredientFormated = {
      name: data.name,
      amount: +data.amount,
      unit: data.unit,
      group: data.group,
      bookmark: false,
      expiry: +data.expiry,
      purchase_date: new Date(data.date).getTime(),
    };
    // Upload
    const newData = await AJAX(`${API_URL_STORAGE}`, ingredientFormated);
    return newData;
  } catch (error) {
    throw error;
  }
}

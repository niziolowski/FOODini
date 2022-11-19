import { Recipe } from "../Recipe.js";
import { Ingredient } from "../Ingredient.js";
import * as model from "../../model.js";
import { Product } from "../Product";

export function addRecipe(data) {
  // format recipe data
  const rec = formatRecipeData(data);
  // add new recipe to state
  model.state.recipes.push(
    new Recipe(
      rec.id,
      rec.title,
      rec.group,
      rec.description,
      rec.ingredients,
      rec.spices,
      rec.difficulty,
      rec.bookmark,
      rec.imageURL
    )
  );
}

export function updateRecipe(id, data) {
  const newRecipe = formatRecipeData(data);

  // Get index of the old recipe
  let oldRecipeIndex = model.state.recipes.indexOf(model.getRecipe(id));

  // Replace it with new recipe
  model.state.recipes.splice(
    oldRecipeIndex,
    1,
    new Recipe(
      newRecipe.id,
      newRecipe.title,
      newRecipe.group,
      newRecipe.description,
      newRecipe.ingredients,
      newRecipe.spices,
      newRecipe.difficulty,
      newRecipe.bookmark,
      newRecipe.imageURL
    )
  );
}

// Process form data and format it for recipe instance generation
export function formatRecipeData(data) {
  // structure ingredients data for ingredient instance generation
  const ingredients = formatIngredientsData(data);

  // structure spices data for recipe instance generation
  const spices = formatSpicesData(data);

  // structure recipe data
  const recipeData = {
    id: null,
    title: data.title,
    group: data.group,
    description: data.description,
    ingredients: ingredients,
    spices: spices,
    difficulty: data.difficulty,
    bookmark: false,
    imageURL: data.imageURL,
  };

  return recipeData;
}

function formatSpicesData(data) {
  // Get entries from data
  const entries = Object.entries(data);
  // Filter out spice entries
  const spicesEntries = entries.filter((item) => item[0].startsWith("spice"));
  // Create array from values
  const spices = spicesEntries.map((item) => item[1]);
  return spices;
}

export function formatIngredientsData(data) {
  const entries = Object.entries(data);
  const ingredientsValues = entries.filter((entry) =>
    entry[0].startsWith("ingredient")
  );

  // Get ingredients from the form
  const ingredientsData = [];
  for (let i = 1; i <= ingredientsValues.length / 3; i++) {
    const name = ingredientsValues.find(
      (item) => item[0] === `ingredient-${i}-name`
    )[1];
    const amount = ingredientsValues.find(
      (item) => item[0] === `ingredient-${i}-amount`
    )[1];
    const unit = ingredientsValues.find(
      (item) => item[0] === `ingredient-${i}-unit`
    )[1];

    ingredientsData.push({ name, amount, unit });
  }

  // Get product data from catalog
  const productsData = ingredientsData.map((ing) =>
    model.state.catalog.find((item) => item.name === ing.name)
  );

  // Create ingredient instances
  const ingredients = productsData.map(
    (prod, i) =>
      new Product(
        prod.id,
        prod.name,
        ingredientsData[i].amount,
        ingredientsData[i].unit,
        prod.group,
        false,
        prod.expiry
      )
  );

  return ingredients;
}

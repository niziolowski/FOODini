import * as model from "../../model.js";

export function getRecipe(title) {
  return model.state.recipes.find((recipe) => recipe.title === title);
}

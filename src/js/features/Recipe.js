import { API_URL_RECIPES } from "../config.js";
import { AJAX } from "../helpers.js";
import * as model from "../model.js";

export class Recipe {
  constructor(
    id,
    title,
    group,
    description,
    ingredients,
    spices,
    difficulty,
    bookmark,
    imageURL
  ) {
    this.id = id;
    this.title = title;
    this.group = group;
    this.description = description;
    this.ingredients = ingredients;
    this.spices = spices;
    this.difficulty = difficulty;
    this.bookmark = bookmark;
    this.imageURL = imageURL;
    this.indicator;
    this.missingIngredients = [];

    this.calcIngredients();
  }

  toggleBookmark() {
    this.bookmark = !this.bookmark;
  }

  async upload() {
    try {
      // Format ingredient object for API

      const recipeFormated = {
        name: this.title,
        group: this.group,
        description: this.description,
        ingredients: this.ingredients,
        spices: this.spices,
        difficulty: this.difficulty,
        bookmark: this.bookmark,
        image_url: this.imageURL,
      };

      // Upload
      const newData = await AJAX(
        `${API_URL_RECIPES}/${this.id}`,
        recipeFormated
      );
      return newData;
    } catch (error) {
      throw error;
    }
  }

  calcIngredients() {
    this.missingIngredients = [];
    // Sum of all ingredients availibility percentage
    let sumPercentages = [];

    this.ingredients.forEach((ing) => {
      // Check required amount
      const required = ing.amount;

      // Check how much is in storage
      const inStorage = model.state.storage
        .filter((item) => item.name === ing.name)
        .reduce((acc, cur) => (acc += cur.amount), 0);

      // Calculate missing ingredients
      const difference = inStorage - required;
      const missingAmount = difference < 0 ? Math.abs(difference) : 0;

      // Create missing ingredient object
      const missingIngredient = {
        name: ing.name,
        amount: missingAmount,
        unit: ing.unit,
      };

      // Add missing ingredient to list (for the shopping-list)
      if (missingAmount > 0) this.missingIngredients.push(missingIngredient);

      //   Calculate percentage of required amount (for the indicator)
      const proportion = inStorage / required;
      const percentage = proportion > 1 ? 100 : proportion * 100;

      // Add percentage to the sum of all percentages
      sumPercentages.push(percentage);
    });

    //   Calculate overall percentage of available ingredients (for the indicator)

    //   Add vaules together
    const sum = sumPercentages.reduce((acc, cur) => (acc += cur), 0);
    //   divide by the number of values
    const indicatorVal = sum / sumPercentages.length;
    //   set indicator value
    this.indicator = indicatorVal;
  }
}

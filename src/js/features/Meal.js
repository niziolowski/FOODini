import * as model from "../model.js";
import { Ingredient } from "./Ingredient.js";

export class Meal {
  constructor(meal) {
    this.id = meal.id;
    this.title = meal?.title || meal?.name;
    this.ingredients = meal.ingredients;
    this.missing = [];
    this.used = [];

    this.calcIngredients();
  }
  calcIngredients() {
    // Reset values
    this.missing = [];
    this.used = [];

    // Calculate
    this.ingredients.forEach((ing) => {
      // Get ingredients of the same type
      const inStorage = model.state.storage.filter(
        (product) => product.name === ing.name
      );

      //   Sort ingredients by purchase date (from the oldest)
      const inStorageSorted = inStorage.sort(
        (a, b) => a.purchaseDate - b.purchaseDate
      );

      //  Subtract ingredients from storage
      let amount = ing.amount;
      let i = 0;

      while (amount > 0) {
        let ingStorage = inStorageSorted;
        //   If ingredient doesn't exist
        if (!ingStorage[i]) {
          // Create a missing ingredient object
          const missingIng = new Ingredient(
            ing.id,
            ing.name,
            ing.amount,
            ing.unit,
            ing.group,
            ing.bookmark,
            ing.purchaseDate,
            ing.expiry
          );
          missingIng.amount = amount;

          //   Add object to missing ingredients
          this.missing.push(missingIng);
          break;
        }

        // If ingredient exist
        if (ingStorage[i].amount > 0) {
          // subtract from storage
          ingStorage[i].amount -= 1;
          // subtract required amount
          amount -= 1;

          // Find id of current ingredient in this.used array
          let usedIng = this.used.find((used) => used.id === ingStorage[i].id);

          // If ingredient is not on the used list yet, create one with amount = 1;
          if (!usedIng) {
            usedIng = new Ingredient(
              ingStorage[i].id,
              ingStorage[i].name,
              ingStorage[i].amount,
              ingStorage[i].unit,
              ingStorage[i].group,
              ingStorage[i].bookmark,
              ingStorage[i].purchaseDate,
              ingStorage[i].expiry
            );
            usedIng.amount = 0;
            this.used.push(usedIng);
          }
          // Add one unit to used ingredient
          usedIng.amount += 1;

          // Check if storage amount = 0
          if (ingStorage[i].amount === 0) {
            // Remove item from storage
            const emptyIngredient = model.getIngredient(usedIng.id);
            model.deleteIngredient(emptyIngredient);

            // find another ingredient of the same type
            i++;
          }
        }
      }
    });
  }
}

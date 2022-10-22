import { Meal } from "./Meal";

export class Day {
  /**
   *
   * @param {String} name of the day
   * @param {Array} meals Array of objects
   */
  constructor(name, meals) {
    this.name = name;
    this.meals = meals;
  }

  addMeal(meal, i) {
    const newMeal = new Meal(meal);
    this.meals.splice(i, 0, newMeal);
  }

  removeMeal(i) {
    this.meals.splice(i, 1);
  }
}

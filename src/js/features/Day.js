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
    this.meals.splice(i, 0, meal);
  }

  removeMeal(i) {
    this.meals.splice(i, 1);
  }
}

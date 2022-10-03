import { AJAX } from "../helpers.js";
import { API_URL_STORAGE } from "../config.js";

export class Ingredient {
  constructor(id, name, amount, unit, group, bookmark, createdAt, expiry) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.group = group;
    this.bookmark = bookmark;
    this.createdAt = createdAt;
    this.expiry = expiry;
    this.daysLeft = this.calcDaysLeft();
  }

  //   Returns number of days until the ingredient goes bad
  calcDaysLeft() {
    const createdAt = this.createdAt / 1000 / 3600 / 24;
    const now = new Date().getTime() / 1000 / 3600 / 24;
    const daysPassed = Math.ceil(Math.abs(createdAt - now));
    const daysLeft = this.expiry - daysPassed;

    return daysLeft < 1 ? 0 : daysLeft;
  }

  toggleBookmark() {
    this.bookmark = !this.bookmark;
  }

  async upload() {
    try {
      // Format ingredient object for API

      const ingredientFormated = {
        name: this.name,
        amount: this.amount,
        unit: this.unit,
        group: this.group,
        bookmark: this.bookmark,
        expiry: this.expiry,
        created_at: this.createdAt,
      };

      // Upload
      const newData = await AJAX(
        `${API_URL_STORAGE}/${this.id}`,
        ingredientFormated
      );
      return newData;
    } catch (error) {
      throw error;
    }
  }
}

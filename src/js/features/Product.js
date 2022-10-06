import { AJAX } from "../helpers.js";
import { API_URL_CATALOG } from "../config.js";
import { timeout } from "../helpers.js";

export class Product {
  constructor(id, name, amount, unit, group, bookmark, expiry) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.group = group;
    this.bookmark = bookmark;
    this.expiry = expiry;
  }

  toggleBookmark() {
    this.bookmark = !this.bookmark;
  }

  async APIedit() {
    try {
      // Format product object for API

      const productFormated = {
        name: this.name,
        amount: this.amount,
        unit: this.unit,
        group: this.group,
        bookmark: this.bookmark,
        expiry: this.expiry,
      };

      // Upload
      const newData = await AJAX(
        `${API_URL_CATALOG}/${this.id}`,
        productFormated
      );
      return newData;
    } catch (error) {
      throw error;
    }
  }

  async APIdelete() {
    try {
      const res = await fetch(`${API_URL_CATALOG}/${this.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (err) {
      throw err;
    }
  }
}

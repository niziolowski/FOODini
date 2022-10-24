import { API_URL_PLAN } from "../config.js";
import { AJAX } from "../helpers.js";
import { Day } from "./Day.js";

export class Week {
  constructor(startDate, endDate, days = undefined, id) {
    this.id = id;
    this.dateRange = { startDate, endDate };
    this.days = days || this._generateDays();
  }

  _generateDays() {
    //   Create names for every day of the week
    const dayNames = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    // Generate days
    const days = dayNames.map((day) => new Day(day, []));
    return days;
  }

  async APIupload() {
    try {
      // Format week object for API

      const weekFormated = {
        dateRange: this.dateRange,
        days: this.days,
      };

      // Upload
      const newData = await AJAX(`${API_URL_PLAN}`, weekFormated);
      return newData;
    } catch (error) {
      throw error;
    }
  }
  async APIedit() {
    try {
      // Format week object for API

      console.log(this);

      const weekFormated = {
        dateRange: this.dateRange,
        days: this.days,
      };

      // Upload
      const newData = await AJAX(`${API_URL_PLAN}/${this.id}`, weekFormated);
      return newData;
    } catch (error) {
      throw error;
    }
  }
}

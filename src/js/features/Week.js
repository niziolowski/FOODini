import { Day } from "./Day.js";

export class Week {
  constructor(startDate, endDate, days = undefined, id, sync = false) {
    this.id = id; //TODO: this might not be needed anymore, refactor it
    this.dateRange = { startDate, endDate };
    this.days = days || this._generateDays();
    this.sync = sync; // if true, missing ingredients will synchronize with shopping list
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
}

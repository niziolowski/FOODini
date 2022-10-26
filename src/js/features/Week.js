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
}

import * as model from "../../model.js";
import { formatDate } from "../../helpers.js";
import { Week } from "../Week";

export function setCurrentWeek() {
  // get date now
  const now = formatDate(new Date());

  // check if current week exists
  let currentWeek = model.state.plan.weeks.find((week) =>
    now >= week.dateRange.startDate && now <= week.dateRange.endDate
      ? week
      : null
  );

  // Create new week if no current week
  if (!currentWeek) currentWeek = newWeek(now);

  // Set current week
  model.state.plan.currentWeek = currentWeek;
  // Add week name for subtitle
  model.state.plan.currentWeek.name = "BieŻący tydzień";

  // Set current week as active
  setActiveWeek(currentWeek);
}

// Swich the week to the next one and if it doesn't exist, create one
export function nextWeek() {
  // Get active week end date
  const endDate = model.state.plan.activeWeek.dateRange.endDate;

  // Add one day to get starDate of the next week
  const newDate = new Date(endDate).getTime() + 1 * 1000 * 60 * 60 * 24;
  // Format the date
  const nextWeekDate = formatDate(new Date(newDate));

  // Check if next week exist
  let nextWeek = model.state.plan.weeks.find((week) =>
    nextWeekDate >= week.dateRange.startDate &&
    nextWeekDate <= week.dateRange.endDate
      ? week
      : null
  );

  // If not, create it and add to plan
  if (!nextWeek) nextWeek = newWeek(nextWeekDate);
  // Set new week as active
  setActiveWeek(nextWeek);
  return nextWeek;
}

// Swich the week to the previous one and if it doesn't exist, create one
export function previousWeek() {
  // Get active week start date
  const startDate = model.state.plan.activeWeek.dateRange.startDate;

  // Subtract one day to get endDate of the previous week
  const newDate = new Date(startDate).getTime() - 7 * 1000 * 60 * 60 * 24;

  // Format the date
  const previousWeekDate = formatDate(new Date(newDate));

  // Check if next week exist
  let previousWeek = model.state.plan.weeks.find((week) =>
    previousWeekDate >= week.dateRange.startDate &&
    previousWeekDate <= week.dateRange.endDate
      ? week
      : null
  );

  if (!previousWeek) return;

  // Set new week as active
  setActiveWeek(previousWeek);

  return previousWeek;
}

export function setActiveWeek(week) {
  model.state.plan.activeWeek = week;
}

export function newWeek(dateString) {
  // 1. Get dateRange
  const date = new Date(dateString);
  // Get day of the week (minus one because we want to get to monday)
  const daysIn = date.getDay() - 1;
  // Set monday as start date
  let startDate = new Date(date - daysIn * 1000 * 60 * 60 * 24);
  // Set sunday as end date
  let endDate = new Date(startDate.getTime() + 6 * 1000 * 60 * 60 * 24);

  // Format dates
  startDate = formatDate(startDate);
  endDate = formatDate(endDate);

  //   Create week obj
  const newWeekObj = new Week(startDate, endDate);

  //   Add to plan
  model.state.plan.weeks.push(newWeekObj);

  // § Update names (for subtitles)

  // get currentWeek index
  const currentWeekIndex = model.state.plan.weeks.indexOf(
    model.state.plan.currentWeek
  );

  // Set weeknames
  model.state.plan.weeks.forEach((week, i) => {
    // Subtract currentWeekIndex from every weekIndex for naming system
    // -1 = previous week
    // 0 = current week
    // 1 = next week
    // 2 = 2 week
    // ...

    const weekNumber = i - currentWeekIndex;

    switch (weekNumber) {
      case -1:
        week.name = "Poprzedni tydzień";
        break;
      case 0:
        week.name = "Bieżący tydzień";
        break;
      case 1:
        week.name = "Następny tydzień";
        break;

      default:
        week.name = `${weekNumber + 1}. tydzień`;
        break;
    }
  });

  return newWeekObj;
}

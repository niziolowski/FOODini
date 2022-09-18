/**
 *
 * @param {Date} date
 * @returns Date formated for input type="date"
 */
export function formatDate(date) {
  let year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

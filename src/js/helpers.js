import { TIMEOUT_SEC } from "./config.js";

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

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns The difference between two dates (number of days)
 */
export function calcDaysLeft(date1, date2) {
  const a = date1 / 1000 / 3600 / 24;
  const b = date2 / 1000 / 3600 / 24;

  return Math.ceil(Math.abs(a - b));
}

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // propagate the error to model.js
    throw err;
  }
};

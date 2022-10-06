import { API_URL_CATALOG } from "../../config";
import { AJAX } from "../../helpers.js";

export async function upload(data) {
  try {
    // Format ingredient object for API
    const productFormated = {
      name: data.name,
      amount: +data.amount,
      unit: data.unit,
      group: data.group,
      bookmark: false,
      expiry: +data.expiry,
    };

    // Upload
    const newData = await AJAX(`${API_URL_CATALOG}`, productFormated);
    return newData;
  } catch (error) {
    throw error;
  }
}

import { state } from "../../model.js";

export function getSuggestions(query) {
  const suggestions = [];

  //   Find matches in catalog and add the to the array
  state.catalog.forEach((item) => {
    if (item.name.toLowerCase().startsWith(query.toLowerCase()))
      suggestions.push(item);
  });

  return suggestions;
}

export function getProduct(target) {
  const productID = +target.dataset.productId;

  // Get clicked product object from catalog database
  const productData = state.catalog.find((product) => product.id === productID);

  return productData;
}

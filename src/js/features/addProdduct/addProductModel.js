export function getSuggestions(input, state) {
  // Get input value
  const value = e.target.value.toLowerCase();
  // Create suggestions list
  const suggestions = [];
  // Compare products to input, add to suggestions if matches
  state.storage.forEach((product) => {
    const productName = product.title.toLowerCase();
    if (productName.startsWith(value)) suggestions.push(product);
  });
}

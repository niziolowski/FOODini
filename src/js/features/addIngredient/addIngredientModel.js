export function getSuggestions(input, state) {
  // Get input value
  const value = input.value.toLowerCase();
  // Create suggestions list
  const suggestions = [];

  // Compare products to input, add to suggestions if matches
  state.catalog.forEach((product) => {
    const productName = product.name.toLowerCase();
    if (productName.startsWith(value)) suggestions.push(product);
  });

  return suggestions;
}

import * as autoCompleteModel from "./autoCompleteModel.js";
import autoCompleteView from "./autoCompleteView.js";

export function autoComplete(event) {
  const input = event.target.closest(".js-ac-input");
  const suggestion = event.target.closest(".js-ac-suggestion");
  const key = event.key;

  //   Clear suggestions (for focusout or switching inputs)
  autoCompleteView.clear();

  if (input) {
    //    On input
    // Get suggestions
    const suggestions = autoCompleteModel.getSuggestions(input.value);
    const suggestionsElement =
      input.parentElement.querySelector(".suggestions");
    // Set input as parent element for AC
    autoCompleteView.setParentElement(suggestionsElement);

    //   Render suggestions
    autoCompleteView.render(suggestions);
  }

  //   On suggestion click perform AC
  if (suggestion) {
    // Get product data
    const productData = autoCompleteModel.getProduct(event.target);

    // exit autocomplete
    autoCompleteView.clear();

    // return data
    return productData;
  }

  // On TAB and ESC
  if (key === "Tab" || key === "Escape") {
    autoCompleteView.clear();
  }

  //   On Enter pick first suggestion
  if (key === "Enter" && input.value.length > 0) {
    // get first suggestion from the list
    const firstSuggestion = getFirstSuggestionEl(event);

    // If suggestion is BTN NEW
    if (firstSuggestion.classList.contains("js-ac-new")) return "new";

    // get product data
    const productData = autoCompleteModel.getProduct(firstSuggestion);

    // return data
    return productData;
  }
}

function getFirstSuggestionEl(e) {
  return e.target.nextElementSibling.children[0];
}

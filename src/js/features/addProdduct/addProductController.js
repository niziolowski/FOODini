import addProductView from "./addProductView.js";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addProductView.hide();

  // Get button
  const btn = e.target.closest("button");

  // Handle btn click
  if (btn) {
    if (btn.classList.contains("add-product-content__header__btn-close"))
      addProductView.hide();
  }
}

function handleAutoComplete(e) {
  // Test
  function handleInput(e) {
    // On "Escape" key exit autocomplete
    if (e.type === "keydown" && e.key === "Escape") {
      addProductView.clearAutoComplete();
    }
  }
  addProductView.addHandlerSuggestions(handleInput);
}

function init() {
  addProductView.addHandlerClick(handleClick);
  addProductView.addHandlerAutoComplete(handleAutoComplete);

  console.log("IMPORT SUCCESSFUL: addProductController");
}

init();

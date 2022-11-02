import addRecipeView from "./addRecipeView";

function handleClick(e) {
  // Handle overlay click
  if (e.target.classList.contains("overlay")) addRecipeView.hide();

  const btn = e.target.closest("button");

  if (!btn) return;

  // BTN close
  if (btn.classList.contains("add-recipe-content__header__btn-close"))
    addRecipeView.hide();
}

function init() {
  addRecipeView.addHandlerClick(handleClick);

  //   for dev
  addRecipeView.show();
}

init();

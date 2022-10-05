import addProductView from "./addProductView.js";

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  if (btn.classList.contains("add-to-catalog-content__header__btn-close"))
    addProductView.hide();
}

function init() {
  addProductView.addHandlerClick(handleClick);
}

init();

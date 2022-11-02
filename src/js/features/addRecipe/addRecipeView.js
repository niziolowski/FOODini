class addRecipeView {
  _parentElement = document.querySelector(".add-recipe");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    // Show Element
    this._parentElement.classList.remove("hidden");
  }
  hide() {
    // Show Element
    this._parentElement.classList.add("hidden");
  }
}

export default new addRecipeView();

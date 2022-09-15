class addProductView {
  _parentElement = document.querySelector(".add-product");
  _productInput = document.querySelector(".add-product-content__form__product");
  _suggestions = document.querySelector(
    ".add-product-content__form .suggestions"
  );

  addHandlerSuggestions(handler) {
    // assign listener to a variable for removal
    this._listeners = handler.bind(this);
    this._productInput.addEventListener("input", this._listeners);
    this._productInput.addEventListener("keydown", this._listeners);
    this._parentElement.addEventListener("click", this._listeners);
  }

  clearAutoComplete() {
    this.removeHandlerInput();
    this.clearSuggestions();
  }

  removeHandlerInput() {
    this._productInput.removeEventListener("input", this._listeners);
    this._productInput.removeEventListener("keydown", this._listeners);
    this._parentElement.removeEventListener("click", this._listeners);
  }

  clearSuggestions() {
    this._suggestions.innerHTML = "";
  }

  addHandlerAutoComplete(handler) {
    this._productInput.addEventListener("focus", handler.bind(this));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}
export default new addProductView();

class addProductView {
  _parentElement = document.querySelector(".add-product");
  _productInput = document.querySelector(".add-product-content__form__product");
  _suggestions = document.querySelector(
    ".add-product-content__form .suggestions"
  );

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

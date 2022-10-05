class addProductView {
  _parentElement = document.querySelector(".add-to-catalog");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    // Show Element
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    // Hide Element
    this._parentElement.classList.add("hidden");
  }
}
export default new addProductView();

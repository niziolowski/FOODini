class addProductView {
  _parentElement = document.querySelector(".add-to-catalog");
  _form = document.querySelector(".add-to-catalog-content__form");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
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

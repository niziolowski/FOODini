import { formatDate } from "../../helpers.js";

class addProductView {
  _parentElement = document.querySelector(".add-product");
  _productInput = document.querySelector(".add-product-content__form__product");
  _suggestions = document.querySelector(
    ".add-product-content__form .suggestions"
  );

  addHandlerACevents(handler) {
    // assign listener to a variable for removal
    this._listeners = handler.bind(this);
    this._productInput.addEventListener("input", this._listeners);
    this._productInput.addEventListener("keydown", this._listeners);
    this._parentElement.addEventListener("click", this._listeners);
  }

  updateForm(data) {
    // define DOM elements
    let product = this._productInput;
    let group = document.querySelector(".add-product-content__form__group");
    let amount = document.querySelector(".add-product-content__form__amount");
    let unit = document.querySelector(".add-product-content__form__unit");
    let expiry = document.querySelector(".add-product-content__form__expiry");

    product.value = data.title;
    group.value = data.group;
    amount.value = data.amount;
    unit.value = data.unit;
    expiry.value = data.expiry;
  }

  clearAC() {
    this.removeHandlerInput();
    this.clearACsuggestions();
  }

  fillAC(product) {
    console.log(product);
  }

  removeHandlerInput() {
    this._productInput.removeEventListener("input", this._listeners);
    this._productInput.removeEventListener("keydown", this._listeners);
    this._parentElement.removeEventListener("click", this._listeners);
  }

  clearACsuggestions() {
    this._suggestions.innerHTML = "";
  }

  renderACsuggestions(suggestions) {
    this._suggestions.innerHTML = `
    ${suggestions
      .map(
        (suggestion) =>
          `<li data-product-id="${suggestion.id}">${suggestion.title}</li>`
      )
      .join("")}
    `;
  }

  addHandlerAC(handler) {
    this._productInput.addEventListener("focus", handler.bind(this));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    // Set date initial value to NOW
    let date = document.querySelector(".add-product-content__form__date");
    date.value = formatDate(new Date());

    // Show Element
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}
export default new addProductView();

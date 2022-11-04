class autoCompleteView {
  _parentElement;

  setParentElement(target) {
    this._parentElement = target;
  }

  clear() {
    if (!this._parentElement) return;
    this._parentElement.innerHTML = "";
  }

  render(suggestions) {
    const markup = this.generateMarkup(suggestions);
    this._parentElement.innerHTML = markup;

    feather.replace();
  }

  generateMarkup(suggestions) {
    return `
    ${suggestions
      .map(
        (suggestion) =>
          `<li class="js-ac-suggestion" data-product-id="${suggestion.id}">${suggestion.name}</li>`
      )
      .join("")}
        
    <li class="suggestions__btn-new js-ac-suggestion js-ac-new"><i>Stwórz nowy produkt</i><i data-feather="edit"></i></li>
    `;
  }
}
export default new autoCompleteView();

import { deleteIngredient } from "../../model";

class addRecipeView {
  _parentElement = document.querySelector(".add-recipe");
  _content = document.querySelector(".add-recipe-content");
  _btnAddIngredient = this._parentElement.querySelector(
    ".add-recipe__btn-add-ingredient"
  );
  _btnAddSpice = this._parentElement.querySelector(
    ".add-recipe__btn-add-spice"
  );

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  // Listeners for auto complete
  addHandlerAC(handler) {
    // Save listeners as variable for removal
    this._listeners = handler.bind(this);

    ["click", "input", "keydown"].forEach((event) =>
      this._parentElement.addEventListener(event, this._listeners)
    );
  }

  updateForm(target, data) {
    // Update name
    target.querySelector(".add-recipe__ingredient__name").value = data.name;
    // Update amount
    target.querySelector(".add-recipe__ingredient__amount").value =
      +data.amount;

    // Update unit
    const options = [...target.getElementsByTagName("option")];
    options.forEach((option) =>
      option.textContent === data.unit
        ? (option.selected = "selected")
        : (option.selected = "")
    );
  }

  // § INGREDIENTS

  generateMarkupIngredient() {
    return `
    <li class="add-recipe__ingredient">
      <div class="add-recipe__ingredient__name__wrapper">
        <input class="add-recipe__ingredient__name js-ac-input" placeholder="Nazwa">
        <ul class="suggestions"></ul>
      </div>
      <input class="add-recipe__ingredient__amount" type="number" value="1">
      <select>
        <option>szt.</option>
        <option>g</option>
        <option>ml</option>
        <option>kg</option>
      </select>
      <button class="add-recipe__btn-delete-ingredient btn-icon small">
        <i data-feather="trash"></i>
      </button>
    </li>
    `;
  }

  addIngredient() {
    // Generate markup
    const markup = this.generateMarkupIngredient();

    // Insert merkup as the last list item
    this._btnAddIngredient.insertAdjacentHTML("beforebegin", markup);

    // Get svg icons
    feather.replace();
  }

  deleteListItem(btn) {
    // Get list item element
    const target = btn.closest("li");

    // remove
    target.remove();
  }

  // § SPICES

  generateMarkupSpice() {
    return `
    <li class="add-recipe__spice">
      <input type="text" placeholder="Nazwa">
      <button class="add-recipe__btn-delete-spice btn-icon small">
        <i data-feather="trash"></i>
      </button>
    </li>
    `;
  }

  addSpice() {
    // Generate spice markup
    const markup = this.generateMarkupSpice();

    // Insert markup as the last list item
    this._btnAddSpice.insertAdjacentHTML("beforebegin", markup);

    // Get svg icons
    feather.replace();
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

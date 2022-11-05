class addRecipeView {
  _parentElement = document.querySelector(".add-recipe");
  _content = document.querySelector(".add-recipe-content");
  _btnAddIngredient = this._parentElement.querySelector(
    ".add-recipe__btn-add-ingredient"
  );
  _btnAddSpice = this._parentElement.querySelector(
    ".add-recipe__btn-add-spice"
  );
  _form = this._parentElement.querySelector("#add-recipe");

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

  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  clearForm() {}

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

  generateMarkupIngredient(index) {
    return `
    <li class="add-recipe__ingredient">
      <div class="add-recipe__ingredient__name__wrapper">
      <input name="ingredient-${index}-name" class="add-recipe__ingredient__name js-ac-input" placeholder="Nazwa" autocomplete="off">
      <ul class="suggestions"></ul>
    </div>
    <input name="ingredient-${index}-amount" class="add-recipe__ingredient__amount" type="number" value="1">
    <select name="ingredient-${index}-unit" class="non-editable">
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
    // Get btn index for ingredient name
    const index = [...this._btnAddIngredient.parentElement.children].indexOf(
      this._btnAddIngredient
    );
    // Generate markup
    const markup = this.generateMarkupIngredient(index);

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

  generateMarkupSpice(index) {
    return `
    <li class="add-recipe__spice">
      <input name="spice-${index}" type="text" placeholder="Nazwa">
      <button class="add-recipe__btn-delete-spice btn-icon small">
        <i data-feather="trash"></i>
      </button>
    </li>
    `;
  }

  addSpice() {
    // Get btn index for ingredient name
    const index = [...this._btnAddSpice.parentElement.children].indexOf(
      this._btnAddSpice
    );

    // Generate spice markup
    const markup = this.generateMarkupSpice(index);

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

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

  setRecipeID(id) {
    this._form.dataset.id = id;
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

      const id = +e.target?.dataset?.id;
      console.log(id);
      handler(data, id);
    });
  }

  clearForm() {
    const ingredients = this._parentElement.querySelector(
      ".add-recipe-content__ingredients"
    );
    const spices = this._parentElement.querySelector(
      ".add-recipe-content__spices"
    );

    const ingredientList = ingredients.querySelectorAll("li");
    ingredientList.forEach((li) => li.remove());

    const spiceList = spices.querySelectorAll("li");
    spiceList.forEach((li) => li.remove());
  }

  updateForm(target, data, mode = "autocomplete") {
    if (mode === "autocomplete") {
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

    // ?* This is an after thought, not ideal...
    if (mode === "edit") {
      this.clearForm();

      const title = this._parentElement.querySelector('input[name="title"]');
      const group = this._parentElement.querySelector('select[name="group"]');
      const difficulty = this._parentElement.querySelector(
        'select[name="difficulty"]'
      );
      const imageURL = this._parentElement.querySelector(
        'input[name="imageURL"]'
      );
      const instructions = this._parentElement.querySelector(
        'textarea[name="description"]'
      );

      title.value = data.title;
      group.value = data.group;
      difficulty.value = data.difficulty;
      imageURL.value = data.imageURL;
      instructions.textContent = data.description;

      const ingredientsMarkup = data.ingredients
        .map((ing, i) => this.generateMarkupIngredient(i + 1, ing))
        .join("");

      this._btnAddIngredient.insertAdjacentHTML(
        "beforebegin",
        ingredientsMarkup
      );

      const spicesMarkup = data.spices
        .map((spice, i) => this.generateMarkupSpice(i + 1, spice))
        .join("");

      this._btnAddSpice.insertAdjacentHTML("beforebegin", spicesMarkup);

      feather.replace();
    }
  }

  // § INGREDIENTS

  generateMarkupIngredient(index, data = null) {
    return `
    <li class="add-recipe__ingredient">
      <div class="add-recipe__ingredient__name__wrapper">
      <input name="ingredient-${index}-name" class="add-recipe__ingredient__name js-ac-input" placeholder="Nazwa" autocomplete="off" value="${
      data ? data.name : ""
    }">
      <ul class="suggestions"></ul>
    </div>
    <input name="ingredient-${index}-amount" class="add-recipe__ingredient__amount" type="number" value="${
      data ? data.amount : "1"
    }">
    <select name="ingredient-${index}-unit" class="non-editable">
      <option ${data?.unit === "szt." ? "selected" : ""}>szt.</option>
      <option ${data?.unit === "g" ? "selected" : ""}>g</option>
      <option ${data?.unit === "ml" ? "selected" : ""}>ml</option>
      <option ${data?.unit === "kg" ? "selected" : ""}>kg</option>
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

  generateMarkupSpice(index, data = null) {
    return `
    <li class="add-recipe__spice">
      <input name="spice-${index}" type="text" placeholder="Nazwa" value="${
      data ? data : ""
    }">
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

  show(id) {
    this.setRecipeID(id);
    // Show Element
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this.setRecipeID(null);
    // Show Element
    this._parentElement.classList.add("hidden");
  }
}

export default new addRecipeView();

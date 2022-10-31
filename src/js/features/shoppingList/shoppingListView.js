class shoppingListView {
  _parentElement = document.querySelector(".shopping-list");
  _btnToggle = document.querySelector(".shopping-list__btn-toggle");
  _btnAdd = document.querySelector(".shopping-list__btn-add");
  _contentSync = document.querySelector("#list-sync");
  _content = document.querySelector("#list");
  _status = "inactive";
  constructor() {
    this.init();
  }
  init() {
    this._addHandlerBtnToggle(); // Handle hover and click events on toggle button
  }

  // For every click other than toggle btn
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  _addHandlerBtnToggle() {
    ["click", "mouseenter", "mouseleave"].forEach((event) =>
      this._parentElement.addEventListener(
        event,
        this._handleBtnToggle.bind(this)
      )
    );
  }

  _handleBtnToggle() {
    switch (event.type) {
      // Peek effect
      case "mouseenter":
        if (this._status === "inactive") {
          this._parentElement.style.transform = "translate(80%)"; // Peek list
          this._btnToggle.style.transform = "translate(-80%)";
        }
        break;

      case "mouseleave":
        if (this._status === "inactive") {
          this._parentElement.style.transform = "translate(101%)"; // Hide
          this._btnToggle.style.transform = "translate(-100%)";
        }
        break;

      // Toggle visibility
      case "click":
        const btn = event.target.closest("button");

        if (!btn) return;
        if (
          (this._status === "active" &&
            btn.classList.contains("shopping-list__btn-toggle")) ||
          (this._status === "active" &&
            btn.classList.contains("shopping-list__btn-close"))
        ) {
          this.hide();
        } else this.show();

      default:
        break;
    }
  }

  // Render list items
  render(shoppingList) {
    const userMarkup = shoppingList.user
      .map((item) => {
        return `
      <li class="shopping-list-item">
        <input class="shopping-list-item__checkbox" type="checkbox">
        <input type="text" class="shopping-list-item__name" contenteditable="true" value="${item.name}">
        <input type="number" class="shopping-list-item__amount" contenteditable="true" value="2">
        <select class="shopping-list-item__unit">
          <option>szt.</option>
          <option>kg</option>
          <option>g</option>
          <option>ml</option>
        </select>
        <button class="shopping-list-item__btn-delete btn-icon small">
          <i data-feather="trash"></i>
        </button>
      </li>
      `;
      })
      .join("");
    const syncMarkup = shoppingList.sync
      .map((item) => {
        return `
        <li class="shopping-list-item sync">
          <input class="shopping-list-item__checkbox" type="checkbox">
          <input type="text" class="shopping-list-item__name" contenteditable="true" value="${
            item.name
          }">
          <input type="number" class="shopping-list-item__amount" contenteditable="true" value="${
            item.amount
          }">
          <select class="shopping-list-item__unit" value="${item.unit}">
          ${["szt.", "kg", "g", "ml"].map((unit) => {
            return `
            <option ${item.unit === unit ? "selected" : ""}>${unit}</option>
            `;
          })}
          </select>
          <button class="shopping-list-item__btn-delete btn-icon small">
            <i data-feather="lock"></i>
          </button>
        </li>
      `;
      })
      .join("");

    this._contentSync.innerHTML = syncMarkup;
    this._content.insertAdjacentHTML("afterbegin", userMarkup);

    feather.replace();
  }

  // Render empty row for a new item
  renderNewItem() {
    // The js-new class is a one time use for focusing on newly created list item
    const markup = `
    <li class="shopping-list-item js-new">
      <input class="shopping-list-item__checkbox" type="checkbox">
      <input class="shopping-list-item__name" contenteditable="true" placeholder="Produkt">
      <input type="number" class="shopping-list-item__amount" contenteditable="true" placeholder="1">
      <select class="shopping-list-item__unit">
        <option>szt.</option>
        <option>kg</option>
        <option>g</option>
        <option>ml</option>
      </select>
      <button class="shopping-list-item__btn-delete btn-icon small">
        <i data-feather="trash"></i>
      </button>
    </li>
    `;

    // Render new item
    this._btnAdd.insertAdjacentHTML("beforebegin", markup);

    // get svg icons
    feather.replace();

    // Get new item El
    const newItemEl = this._content.querySelector(".js-new");

    // Focus on product input
    newItemEl.querySelector(".shopping-list-item__name").focus();

    // Remove .js-new class
    newItemEl.classList.remove("js-new");
  }

  removeItem(btn) {
    // Find list item
    const itemEl = btn.closest("LI");

    // Remove element
    itemEl.remove();
  }

  show() {
    this._btnToggle.style.transform = "translate(-10%)";
    this._parentElement.style.transform = "translate(0%)";
    this._status = "active";
  }
  hide() {
    this._btnToggle.style.transform = "translate(-100%)";
    this._parentElement.style.transform = "translate(101%)";
    this._status = "inactive";
  }
}
export default new shoppingListView();

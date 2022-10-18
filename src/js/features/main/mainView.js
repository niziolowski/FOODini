class mainView {
  _parentElement = document.querySelector(".main-view");
  _days = document.querySelectorAll(".plan-day-list");
  _planWeek = this._parentElement.querySelector(".plan-week");
  // Make space for the sidebar
  shift() {
    this._parentElement.classList.toggle("shift");
  }

  addHandlerClick(handler) {
    this._planWeek.addEventListener("click", handler.bind(this));
  }

  addHandlerDragAndDrop(handler) {
    // Controller handlers
    ["drop"].forEach((event) =>
      this._parentElement.addEventListener(event, handler.bind(this))
    );

    // View handlers
    this._parentElement.addEventListener(
      "dragstart",
      this._handleDragStart.bind(this)
    );
    this._parentElement.addEventListener(
      "dragend",
      this._handleDragEnd.bind(this)
    );
    this._parentElement.addEventListener(
      "dragleave",
      this._handleDragLeave.bind(this)
    );
    this._parentElement.addEventListener(
      "dragover",
      this._handleDragOver.bind(this)
    );
  }

  _handleDragStart(e) {
    // Get day ID from which the dragging start
    const day = e.target.closest("ul").id;

    // Get item index for reference
    const index = [...e.target.closest("ul").children].indexOf(e.target);

    // Get item id
    const id = e.target.dataset.id;

    // Create dataTransfer object
    const data = {
      mode: "move",
      day,
      index,
      id,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }

  _handleDragEnd(e) {
    e.target.classList.remove("dragging");
    e.target.closest(".plan-day").classList.remove("drag-over");
  }

  _handleDragLeave(e) {
    if (e.target.classList.contains("plan-day"))
      e.target.classList.remove("drag-over");

    // remove placeholder if present
    const placeholder = e.target.querySelector(".placeholder");
    if (placeholder) placeholder.remove();
  }

  _handleDragOver(e) {
    e.preventDefault();

    // Clear Indication on all days
    this.clearDaysIndication();

    // Indicate dragover on hovered day
    const day = e.target.closest(".plan-day");
    if (day) day.classList.add("drag-over");

    // Get list element
    const list = e.target.closest(".plan-day-list");
    if (!list) return;

    // Get items inside a list
    const items = [
      ...list.querySelectorAll(".plan-day-list__item:not(.dragging)"),
    ];

    // Get element below the cursor for drop position
    const elementBelow = this._getElementBelow(items, e.clientY);

    // Create placeholder for items from the sidebar and prevent from creating new on every event
    let placeholder = list.querySelector(".placeholder");
    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.classList.add("placeholder");
    }

    if (!elementBelow) {
      // If the list is empty or dragging after, all items, drop at the end
      list.appendChild(placeholder);
    } else {
      // If there is an item below, drop before
      list.insertBefore(placeholder, elementBelow);
    }
  }
  clearDaysIndication() {
    const days = document.querySelectorAll(".plan-day");
    days.forEach((day) => day.classList.remove("drag-over"));
  }

  /**
   * Function used to find position for dropping an item in a list of items
   * @param {Array} items from the plan-day list
   * @param {Number} y Mouse position
   * @returns Element from the list, below the mouse position
   */
  _getElementBelow(items, y) {
    // Get the closest element below the cursor
    return items.reduce(
      (closest, child) => {
        const rect = child.getBoundingClientRect();
        const offset = y - rect.top - rect.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  render(week, state) {
    // Clear the week-plan
    this._days.forEach((day) => (day.innerHTML = ""));

    // Render data
    this._days.forEach((day, i) => {
      // Get data for a specific day
      const data = week.days[i];
      if (!data) return;

      // Add HTML for each meal
      data.meals.forEach(
        (meal) => (day.innerHTML += this.generateMarkupMeal(meal, state))
      );
    });

    // Set week ID
    this._planWeek.id = `${week.dateRange.startDate}`;

    // Get svg icons
    feather.replace();
  }

  generateMarkupMeal(meal, state) {
    // For ingredients
    if (!meal.ingredients) {
      const tag = state.tags.storage.indexOf(meal.group) + 1;
      return `
        <li class="plan-day-list__item" data-id="i-${meal.id}" draggable="true">
          <p class="plan-day-list__item__name">${meal?.title || meal?.name}</p>
          <button class="plan-day-list__item__btn-delete btn-icon small"><i data-feather="trash"></i></button>
          <span class="plan-day-list__item__tag" style="background-color: var(--tag-${tag}-color"></span>
        </li>
      `;
    }

    // For recipes
    if (meal.ingredients) {
      const tag = state.tags.recipes.indexOf(meal.group) + 1;
      return `
        <li class="plan-day-list__item" data-id="r-${meal.id}" draggable="true">
          <p class="plan-day-list__item__name">${meal?.title || meal?.name}</p>
          <button class="plan-day-list__item__btn-delete btn-icon small"><i data-feather="trash"></i></button>
          <span class="plan-day-list__item__tag" style="background-color: var(--tag-${tag}-color"></span>
        </li>
      `;
    }
  }
}
export default new mainView();

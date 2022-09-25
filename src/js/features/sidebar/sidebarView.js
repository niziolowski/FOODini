import icons from "../../../img/icons.svg";

class sidebarView {
  _parentElement = document.querySelector(".sidebar");
  _header = document.querySelector(".sidebar-header");
  _options = document.querySelector(".sidebar-options");
  _content = document.querySelector(".sidebar-content");
  _status = {
    active: false,
    fullPage: false,
    activeTab: "storage",
    view: "columns",
  };

  init(state) {
    this.render(state);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    this._status.active = true;
    this._parentElement.classList.add("active");
  }

  hide() {
    this._status.active = false;
    this._parentElement.classList.remove("active");
  }

  maximize(state) {
    this._status.fullPage = true;
    this._parentElement.classList.add("full-page");
    this._header.innerHTML = this.generateMarkupHeader();
    this._options.innerHTML = this.generateMarkupOptions();

    if (this._status.activeTab === "storage")
      this._content.innerHTML =
        this.generateMarkupFullPageStorageColumns(state);
    if (this._status.activeTab === "recipes")
      this._content.innerHTML =
        this.generateMarkupFullPageRecipesColumns(state);
  }

  minimize(state) {
    this._status.fullPage = false;
    this._parentElement.classList.remove("full-page");
    this._header.innerHTML = this.generateMarkupHeader();
    this._options.innerHTML = this.generateMarkupOptions();

    if (this._status.activeTab === "storage")
      this._content.innerHTML = this.generateMarkupStorage(state);
    if (this._status.activeTab === "recipes")
      this._content.innerHTML = this.generateMarkupRecipes(state);
  }

  toggleFullPage(state) {
    switch (this._status.fullPage) {
      case false:
        this.maximize(state);
        break;
      case true:
        this.minimize(state);
        break;

      default:
        break;
    }
    // replace icons with svg
    feather.replace();
  }

  toggle() {
    switch (this._status.active) {
      case false:
        this.show();
        break;
      case true:
        this.hide();
        break;

      default:
        break;
    }
  }

  handleTabs(btn, state) {
    // Skip if clicked tab is already active
    if (btn.classList.contains("active")) return;

    // Set all tab elements inactive
    [...btn.parentElement.children].forEach((el) => {
      el.classList.remove("active");
    });

    // Set clicked tab element as active
    btn.classList.add("active");

    // Get tab data
    const tab = btn.dataset.tab;

    // Update status active tab
    this._status.activeTab = tab;

    // Render sidebar content
    this.render(state);
  }

  // Render sidebar content depending on view type
  render(state) {
    // Render side view
    if (!this._status.fullPage) {
      if (this._status.activeTab === "storage") {
        this._content.innerHTML = this.generateMarkupStorage(state);
      }
      if (this._status.activeTab === "recipes") {
        this._content.innerHTML = this.generateMarkupRecipes(state);
      }
    }

    // Render full-page view
    if (this._status.fullPage) {
      if (this._status.activeTab === "storage") {
        if (this._status.view === "columns")
          this._content.innerHTML =
            this.generateMarkupFullPageStorageColumns(state);

        if (this._status.view === "table")
          this._content.innerHTML =
            this.generateMarkupFullPageStorageColumns(state);
      }
      if (this._status.activeTab === "recipes")
        this._content.innerHTML =
          this.generateMarkupFullPageRecipesColumns(state);
    }

    // replace icon with svg
    feather.replace();
  }

  // Generate markup for both views
  generateMarkupHeader() {
    const tab = this._status.activeTab;
    // Tabs for side view
    if (!this._status.fullPage) {
      return `
          <button class="sidebar-header__tab btn-tab ${
            tab === "storage" ? "active" : ""
          }" data-tab="storage">
            Spiżarnia
          </button>
          <button class="sidebar-header__tab btn-tab ${
            tab === "recipes" ? "active" : ""
          }" data-tab="recipes">
            Baza przepisów
          </button>
      `;
    }

    // Tabs for full-page view
    if (this._status.fullPage) {
      return `
      <div class="sidebar-header__col">
        <button class="sidebar-header__btn-sidebar btn-icon">
          <i data-feather="sidebar"></i>
        </button>
        <button class="sidebar-header__btn-view btn-icon">
          <i data-feather="table"></i>
        </button>
      </div>
      <div class="sidebar-header__tabs">
        <button class="sidebar-header__tabs__tab btn-tab ${
          tab === "storage" ? "active" : ""
        }" data-tab="storage">
          SPIŻARNIA
        </button>
        <span class="sidebar-header__tabs__divider"></span>
        <button class="sidebar-header__tabs__tab btn-tab ${
          tab === "recipes" ? "active" : ""
        }" data-tab="recipes">
          BAZA PRZEPISÓW
        </button>
      </div>
      <button class="sidebar__btn-full-page btn-icon">
        <i data-feather="x"></i>
      </button>
    `;
    }
  }

  // Generate Markup for options in side view
  generateMarkupOptions() {
    // Options for side view
    if (!this._status.fullPage) {
      return `
        <div class="row">
          <button class="sidebar__btn-add-product btn-icon small">
            <i data-feather="plus"></i>
          </button>
          <div class="sidebar__search-bar">
            <input type="search" placeholder="Szukaj">
            <i data-feather="search"></i></div>
          <button class="sidebar__btn-full-page btn-icon small">
            <i data-feather="maximize-2"></i>
          </button>
        </div>
        <div class="row">
          <span>Filtr</span>
          <select>
            <option>brak</option>
          </select>
          <button class="btn-icon small fill">
            <i data-feather="star"></i>
          </button>
        </div>
    `;
    }

    // Options for full-page view
    if (this._status.fullPage) {
      return "";
    }
  }

  // Generate Markup for storage in side view
  generateMarkupStorage(state) {
    return `
        ${state.storage
          .map((ing) => this.generateMarkupIngredient(ing, state))
          .join("")}
      `;
  }

  // Generate Markup for an ingredient in column mode
  generateMarkupIngredient(ing, state) {
    // calculate indicator width
    const indicatorWidth = (100 * ing.daysLeft) / ing.expiry;

    // get tag index
    const tag = state.tags.storage.indexOf(ing.group) + 1;

    return `
    <li class="list-item-storage">
      <button class="list-item-storage__btn-bookmark btn-icon small fill ${
        ing.bookmark ? "active" : ""
      }">
      <i data-feather="star"></i>
      </button>
      <a class="list-item-storage__title">${ing.name}</a>
      <div class="list-item-storage__amount">${ing.amount}</div>
      <div class="list-item-storage__unit">${ing.unit}</div>
      <div class="list-item-storage__expiry">
        <div class="expiry-days-left">${ing.daysLeft}</div>
        <div class="expiry-indicator">
          <div class="expiry-indicator__bar" style="width: ${indicatorWidth}%; background: var(--accent-color)"></div>
        </div>
      </div>
      <button class="btn-icon small">
        <i data-feather="shopping-bag"></i>
      </button>
      <div class="list-item-storage__tag" style="background-color: var(--tag-${tag}-color)"></div>

    </li>
  `;
  }

  // Generate Markup for recipes in side view
  generateMarkupRecipes(state) {
    return `
        ${state.recipes
          .map((recipe) => this.generateMarkupRecipe(recipe, state))
          .join("")}
      `;
  }

  generateMarkupRecipe(recipe, state) {
    // get tag index
    const tag = state.tags.recipes.indexOf(recipe.group) + 1;

    // generate difficulty indicator
    let difficulty = "";

    // fill the stars accordingly
    for (let i = 0; i < 5; i++) {
      difficulty += `
      <svg class="${i < recipe.difficulty ? "fill" : ""}">
        <use href="${icons}#star"></use>
      </svg>
      `;
    }

    return `
          <li class="list-item-recipe">
            <div class="list-item-recipe__image">
              <img src="${recipe.imageUrl}" alt="recipe-photo">
              <div class="list-item-recipe__tag" style="background-color: var(--tag-${tag}-color)">${recipe.group}</div>
            </div>
            <div class="col">
            
              <a href="#${recipe.title}" class="list-item-recipe__title">${recipe.title}</a>
              <div class="list-item-recipe__info">
                <div class="info-difficulty">
                  <p>Trudność</p>
                  <div class="info-difficulty__indicator">
                    ${difficulty}                    
                  </div>
                </div>
                <div class="info-ingredients">
                  <p>Składniki</p>
                  <div class="info-ingredients__indicator">
                  <div class="info-ingredients__indicator__bar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <button class="list-item-recipe__btn-bookmark btn-icon small fill">
              <i data-feather="star"></i>
              </button>
              <button class="btn-icon small">
                <i data-feather="shopping-bag"></i>
              </button>
            </div>
          </li>
          `;
  }

  // Generate Markup for storage in full-page column view
  generateMarkupFullPageStorageColumns(state) {
    // Group ingredients by tag name
    const tag1Ingredients = state.storage.filter(
      (ing) => ing.group === "świeże"
    );
    const tag2Ingredients = state.storage.filter(
      (ing) => ing.group === "suche"
    );
    const tag3Ingredients = state.storage.filter(
      (ing) => ing.group === "mrożone"
    );

    return `
      <div class="sidebar-content__grid">
        <section class="col">
          <header class="col-header">
            <div class="title">ŚWIEŻE</div>
            <button class="btn-icon small"><i data-feather="plus"></i></button>
          </header>
          <ul class="sidebar-content__grid__storage-list">
            ${tag1Ingredients
              .map((ing) => this.generateMarkupIngredient(ing, state))
              .join("")}
          </ul>
        </section>
        <section class="col">
          <header class="col-header">
            <div class="title">SUCHE</div>
            <button class="btn-icon small"><i data-feather="plus"></i></button>
          </header>
          <ul class="sidebar-content__grid__storage-list">
          ${tag2Ingredients
            .map((ing) => this.generateMarkupIngredient(ing, state))
            .join("")}
          </ul>
        </section>
        <section class="col"><header class="col-header">
          <div class="title">MROŻONE</div>
          <button class="btn-icon small"><i data-feather="plus"></i></button>
        </header>
        <ul class="sidebar-content__grid__storage-list">
        ${tag3Ingredients
          .map((ing) => this.generateMarkupIngredient(ing, state))
          .join("")}        
        </ul></section>
      </div>
    `;
  }
  // Generate Markup for storage in full-page table view
  generateMarkupFullPageStorageTable(state) {
    return "storage table";
  }
  // Generate Markup for recipes in full-page column view
  generateMarkupFullPageRecipesColumns(state) {
    // Group recipes by tag name
    const tag1Recipes = state.recipes.filter(
      (recipe) => recipe.group === "śniadanie"
    );
    const tag2Recipes = state.recipes.filter(
      (recipe) => recipe.group === "obiad"
    );
    const tag3Recipes = state.recipes.filter(
      (recipe) => recipe.group === "przekąska"
    );

    return `
      <div class="sidebar-content__grid">
        <section class="col">
          <header class="col-header">
            <div class="title">ŚNIADANIE</div>
            <button class="btn-icon small">
              <i data-feather="plus"></i>
            </button>
          </header>
          <ul class="sidebar-content__grid__storage-list">
            ${tag1Recipes
              .map((recipe) => this.generateMarkupRecipe(recipe, state))
              .join("")}
          </ul>
        </section>
        <section class="col">
          <header class="col-header">
            <div class="title">OBIAD</div>
            <button class="btn-icon small"><i data-feather="plus"></i></button>
          </header>
          <ul class="sidebar-content__grid__storage-list">
          ${tag2Recipes
            .map((recipe) => this.generateMarkupRecipe(recipe, state))
            .join("")}
          </ul>
        </section>
        <section class="col"><header class="col-header">
          <div class="title">PRZEKĄSKA</div>
          <button class="btn-icon small"><i data-feather="plus"></i></button>
        </header>
        <ul class="sidebar-content__grid__storage-list">
        ${tag3Recipes
          .map((recipe) => this.generateMarkupRecipe(recipe, state))
          .join("")}        
        </ul></section>
      </div>
    `;
  }
}
export default new sidebarView();

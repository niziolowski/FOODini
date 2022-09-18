class sidebarView {
  _parentElement = document.querySelector(".sidebar");
  _content = document.querySelector(".sidebar-content");
  _status = "inactive";

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    this._status = "active";
    this._parentElement.classList.add("active");
  }

  hide() {
    this._status = "inactive";
    this._parentElement.classList.remove("active");
  }

  toggle() {
    switch (this._status) {
      case "inactive":
        this.show();
        break;
      case "active":
        this.hide();
        break;

      default:
        break;
    }
  }

  renderTab(btn, state) {
    if (btn.classList.contains("active")) return;
    const tab = btn.dataset.tab;

    // set all tabs inactive
    [...btn.parentElement.children].forEach((el) => {
      el.classList.remove("active");
    });

    btn.classList.add("active");

    if (tab === "storage") {
      this._content.innerHTML = `

      ${state.storage
        .map((ing) => {
          return `
          <li class="list-item-storage">
            <button class="list-item-storage__btn-bookmark btn-icon small">
              <i data-feather="star"></i>
            </button>
            <a class="list-item-storage__title">${ing.name}</a>
            <div class="list-item-storage__amount">${ing.amount}</div>
            <div class="list-item-storage__unit">${ing.unit}</div>
            <div class="list-item-storage__expiry">
              <div class="expiry-days-left">${ing.daysLeft}</div>
              <div class="expiry-indicator">
                <div class="expiry-indicator__bar" style="width: 30%; background: var(--accent-color)"></div>
              </div>
            </div>
            <button class="btn-icon small">
              <i data-feather="shopping-bag"></i>
            </button>
            <div class="list-item-storage__tag"></div>

          </li>
        `;
        })
        .join("")}
      
      `;
    }

    if (tab === "recipes") {
      this._content.innerHTML = `
      ${state.recipes
        .map((recipe) => {
          return `
        <li class="list-item-recipe">
          <div class="list-item-recipe__image">
            <img src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg" alt="recipe-photo">
            <div class="list-item-recipe__tag">śniadanie</div>
          </div>
          <div class="col">
            <a class="list-item-recipe__title">Makaron z sosem pomidorowym i parmezanem</a>
            <div class="list-item-recipe__info">
              <div class="info-difficulty">
                <p>Trudność</p>
                <div class="info-difficulty__indicator">
                  <i data-feather="star"></i>
                  <i data-feather="star"></i>
                  <i data-feather="star"></i>
                  <i data-feather="star"></i>
                  <i data-feather="star"></i>
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
            <button class="list-item-recipe__btn-bookmark btn-icon small">
              <i data-feather="star"></i>
            </button>
            <button class="btn-icon small">
              <i data-feather="shopping-bag"></i>
            </button>
          </div>
        </li>
        `;
        })
        .join("")}
      `;
    }
    // replace icon with svg
    feather.replace();
  }
}
export default new sidebarView();

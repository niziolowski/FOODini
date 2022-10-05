class catalogView {
  _parentElement = document.querySelector(".product-catalog");
  _table = document.querySelector(".product-catalog-table");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }
  render(state) {
    this._table.innerHTML = this.generateMarkup(state);
    // replace icon with svg
    feather.replace();
  }

  generateMarkup(state) {
    return `
      <tr>
      <th><button class="btn-icon small fill"><i data-feather="star"></i></button></th>
      <th>Produkt</th>
      <th>Ilość</th>
      <th>Jend.</th>
      <th>Grupa</th>
      <th>Ważność</th>
      <th></th>
      <th></th>
      </tr>
      ${state.catalog
        .map((item) => {
          // Get tag color
          const tag = state.tags.storage.indexOf(item.group) + 1;

          return `
            <tr id="c-${item.id}">
            <td><button class="js-btn-bookmark btn-icon small fill ${
              item.bookmark ? "active" : ""
            }"><i data-feather="star"></i></button></td>
            <td>${item.name}</td>
            <td>${item.amount}</td>
            <td>${item.unit}</td>
            <td><div class="tag" style="background-color: var(--tag-${tag}-color)">${
            item.group
          }</div></td>
            <td>${item.expiry} dni</td>
            <td><button class="btn-icon small"><i data-feather="edit"></i></button></td>
            <td><button class="js-btn-delete btn-icon small"><i data-feather="trash"></i></button></td>
        </tr>
        `;
        })
        .join("")}
    `;
  }

  show(state) {
    this.render(state);
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}

export default new catalogView();

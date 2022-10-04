class catalogView {
  _parentElement = document.querySelector(".product-catalog");
  _table = document.querySelector(".product-catalog-table");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }
  render(catalog) {
    this._table.innerHTML = this.generateMarkup(catalog);
    // replace icon with svg
    feather.replace();
  }

  generateMarkup(catalog) {
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
    ${catalog
      .map((item) => {
        return `
        <tr>
            <td><button class="btn-icon small fill"><i data-feather="star"></i></button></td>
            <td>${item.name}</td>
            <td>${item.amount}</td>
            <td>${item.unit}</td>
            <td>${item.group}</td>
            <td>${item.expiry} dni</td>
            <td><button class="btn-icon small"><i data-feather="edit"></i></button></td>
            <td><button class="btn-icon small"><i data-feather="trash"></i></button></td>
        </tr>
        `;
      })
      .join("")}
    `;
  }

  show(catalog) {
    this.render(catalog);
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}

export default new catalogView();

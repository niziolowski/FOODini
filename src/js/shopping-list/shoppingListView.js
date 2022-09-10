class shoppingListView {
  _parentEl = document.querySelector(".shopping-list");
  _btnToggle = document.querySelector(".shopping-list__btn-toggle");
  _status = "inactive";

  init() {
    this._addHandlerBtnToggle(); // Handle hover and click events on toggle button
  }

  _addHandlerBtnToggle() {
    ["click", "mouseenter", "mouseleave"].forEach((event) =>
      this._parentEl.addEventListener(event, this._handleBtnToggle.bind(this))
    );
  }

  _handleBtnToggle() {
    switch (event.type) {
      // Peek effect
      case "mouseenter":
        if (this._status === "inactive") {
          this._parentEl.style.transform = "translate(80%)"; // Peek list
        }
        break;

      case "mouseleave":
        if (this._status === "inactive") {
          this._parentEl.style.transform = "translate(101%)"; // Hide
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

  show() {
    this._btnToggle.style.transform = "translate(-10%)";
    this._parentEl.style.transform = "translate(0%)";
    this._status = "active";
  }
  hide() {
    this._btnToggle.style.transform = "translate(-100%)";
    this._parentEl.style.transform = "translate(101%)";
    this._status = "inactive";
  }
}
export default new shoppingListView();

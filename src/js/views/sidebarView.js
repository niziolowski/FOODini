class sidebarView {
  _parentElement = document.querySelector(".sidebar");
  _status = "inactive";
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
}
export default new sidebarView();

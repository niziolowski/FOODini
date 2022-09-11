class settingsView {
  _parentElement = document.querySelector(".settings");

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}
export default new settingsView();

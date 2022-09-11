class mainView {
  _parentElement = document.querySelector(".main-view");
  // Make space for the sidebar
  shift() {
    this._parentElement.classList.toggle("shift");
  }
}
export default new mainView();

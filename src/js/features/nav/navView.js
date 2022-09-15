class navView {
  _parentElement = document.querySelector(".main-view__nav");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }
}
export default new navView();

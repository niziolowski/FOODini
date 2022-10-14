class navView {
  _parentElement = document.querySelector(".main-view__nav");
  _subtitle = this._parentElement.querySelector("h2");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  updateSubtitle(string) {
    this._subtitle.innerText = `${string}`;
  }
}
export default new navView();

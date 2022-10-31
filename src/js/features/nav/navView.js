class navView {
  _parentElement = document.querySelector(".main-view__nav");
  _subtitle = this._parentElement.querySelector("h2");
  _btnSync = this._parentElement.querySelector(
    ".main-view__nav__controlls__btn-add-shopping-list"
  );

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  updateSubtitle(string) {
    this._subtitle.innerText = `${string}`;
  }

  updateBtnSync(status) {
    if (!status) this._btnSync.classList.remove("active");
    if (status) this._btnSync.classList.add("active");
  }
}
export default new navView();

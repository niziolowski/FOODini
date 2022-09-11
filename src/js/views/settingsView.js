class settingsView {
  _parentElement = document.querySelector(".settings");
  _root = document.querySelector(":root");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }

  /**
   * Updates the input values and labels in the theme-editor
   * @param {Array} colorTheme
   */
  updateThemeEditor(colorTheme) {
    colorTheme.forEach((color) => {
      const input = this._parentElement.querySelector(
        `[data-color="${color.property}"]`
      );
      const label = input.parentElement.querySelector(".label__value");

      input.value = color.value;
      label.textContent = input.value;
    });
  }

  /**
   * Function takes an array of colors and changes the main color theme by changing the :root element styles.
   * @param {Array} colorTheme   *
   */
  updateColorTheme(colorTheme) {
    // Change color in root
    colorTheme.forEach((color) => {
      this._root.style.setProperty(color.property, color.value);
    });

    // Update theme editor
    this.updateThemeEditor(colorTheme);
  }
}
export default new settingsView();

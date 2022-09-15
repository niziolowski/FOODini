class addProductView {
  _parentElement = document.querySelector(".add-product");
  _productInput = document.querySelector(".add-product-content__form__product");
  _suggestions = document.querySelector(
    ".add-product-content__form .suggestions"
  );

  // Event Listeners (as a variable for removing to work)
  stopAutoComplete = this.stopAutoComplete.bind(this);
  makeSuggestions = this.makeSuggestions.bind(this);
  handleAutoCompleteClick = this.handleAutoCompleteClick.bind(this);

  init() {
    this._productInput.addEventListener("focus", this.autoComplete.bind(this));
  }

  /*
Logic:
// VIEW
  1. Init (listen for input focus)
  2. Input focused
  3. handleAutocomplete() {
    a = listener Click
    b = listener Keydown
    c = listener Input

    addHandlersAutoComplete() {
      a,b,c
    } 

// CONTROLLER
// MODEL
    getSuggestions()
    
// VIEW
    renderSuggestions()
    clearAutoComplete() {
      removeHandlersAutoComplete()
      removeSuggestions();
    };





  }
*/

  autoComplete(e) {
    // 3. Listeners added (input, escape, click)
    this._parentElement.addEventListener("click", this.handleAutoCompleteClick);
    this._productInput.addEventListener("keydown", this.stopAutoComplete);
    // On input (compare, make sugg list, display)
    this._productInput.addEventListener("input", this.makeSuggestions);
  }

  stopAutoComplete(e) {
    // On "escape" key (clearSuggestions, remove handlers)

    if (e.type === "keydown" && e.key === "Escape") {
      // Remove listeners
      this._productInput.removeEventListener("keydown", this.stopAutoComplete);
      this._productInput.removeEventListener("input", this.makeSuggestions);
      this._parentElement.removeEventListener(
        "click",
        this.performAutoComplete
      );

      // Clear suggestions
      this.clearSuggestions();
    }
  }

  handleAutoCompleteClick(e) {
    const tagName = e.target.tagName;

    // Autocomplete the form with chosen product data
    if (tagName === "LI") {
      const product = e.target;

      // code
    }

    // When user click out the input area
    if (tagName !== "LI" && tagName !== "INPUT") {
      // Remove listeners
      this._productInput.removeEventListener("keydown", this.stopAutoComplete);
      this._productInput.removeEventListener("input", this.makeSuggestions);
      this._parentElement.removeEventListener(
        "click",
        this.performAutoComplete
      );

      // Clear suggestions
      this.clearSuggestions();
    }
  }

  // On click (get product, fill form with initial values)

  clearSuggestions() {
    this._suggestions.innerHTML = "";
  }

  makeSuggestions(e) {
    // Test state
    const state = {
      storage: [
        {
          id: 1,
          createdAt: 1660643417457,
          title: "Jajka",
          amount: 10,
          unit: "szt.",
          expiry: 14,
          bookmark: true,
          group: "świeże",
          daysLeft: 3,
        },
        {
          id: 2,
          createdAt: 1660643655319,
          title: "Mięso",
          amount: 1,
          unit: "kg",
          expiry: 3,
          bookmark: false,
          group: "świeże",
          daysLeft: 10,
        },
        {
          id: 3,
          createdAt: 1660645683669,
          title: "Mąka",
          amount: 2,
          unit: "kg",
          expiry: 100,
          bookmark: false,
          group: "suche",
          daysLeft: 73,
        },
      ],
      recipes: [
        {
          id: 1,
          createdAt: 1661700093430,
          title: "Jajecznica",
          group: "śniadanie",
          difficulty: 1,
          bookmark: false,
          imageUrl:
            "https://cdn.galleries.smcloud.net/t/photos/gf-bc5p-Ttbo-1SJC_jajecznica-podstawowy-przepis-na-klasyczna-potrawe-z-rozmaconych-jajek.jpg",
          description:
            "Normalnie, jajka rozbić na patelnii i smażyć aż się zetno.",
          ingredients: [{ foodini_storage_id: 1, quantity: 4, unit: "szt." }],
        },
      ],

      colorTheme: [
        { property: "--bg-color", value: "#f5f5f5" },
        { property: "--primary-color", value: "#91ad67" },
        { property: "--font-dark-color", value: "#333333" },
        { property: "--tag1-color", value: "#ffe047" },
        { property: "--tag2-color", value: "#7ab4ff" },
        { property: "--tag3-color", value: "#dd6b6b" },
      ],
      tags: {
        storage: ["świeże", "suche", "mrożone"],
        recipes: ["śniadanie", "obiad", "kolacja"],
      },
    };
    // Get input value
    const value = e.target.value.toLowerCase();
    // Create suggestions list
    const suggestions = [];
    // Compare products to input, add to suggestions if matches
    state.storage.forEach((product) => {
      const productName = product.title.toLowerCase();
      if (productName.startsWith(value)) suggestions.push(product);
    });

    // Render suggestions
    this._suggestions.innerHTML = `
    ${suggestions
      .map(
        (suggestion) =>
          `<li data-product-id="${suggestion.id}">${suggestion.title}</li>`
      )
      .join("")}
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}
export default new addProductView();

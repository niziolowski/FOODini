export class Ingredient {
  constructor(
    id,
    name,
    amount,
    unit,
    group,
    bookmark,
    purchaseDate,
    expiry,
    checkbox = false
  ) {
    this.id = id || +(Math.random() * 1000000).toFixed();
    this.name = name;
    this.amount = +amount;
    this.unit = unit;
    this.group = group;
    this.bookmark = bookmark || false;
    this.purchaseDate = new Date(purchaseDate).getTime();
    this.expiry = +expiry;
    this.daysLeft = this.calcDaysLeft();
    this.checkbox = checkbox;
  }

  //   Returns number of days until the ingredient goes bad
  calcDaysLeft() {
    const purchaseDate = this.purchaseDate / 1000 / 3600 / 24;
    const now = new Date().getTime() / 1000 / 3600 / 24;
    const daysPassed = Math.ceil(Math.abs(purchaseDate - now));
    const daysLeft = this.expiry - daysPassed;

    return daysLeft < 1 ? 0 : daysLeft;
  }

  toggleBookmark() {
    this.bookmark = !this.bookmark;
  }
}

export class Product {
  constructor(id, name, amount, unit, group, bookmark, expiry) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.group = group;
    this.bookmark = bookmark;
    this.expiry = expiry;
  }

  toggleBookmark() {
    this.bookmark = !this.bookmark;
  }
}

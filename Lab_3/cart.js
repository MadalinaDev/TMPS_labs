export class Cart {
  constructor() {
    this.items = [];
    console.log("Cart initialized.");
  }

  add(item) {
    console.log("Adding item:", item);
    this.items.push(item);
    console.log("Current cart:", this.items);
  }

  remove(item) {
    console.log("Removing item:", item);
    this.items = this.items.filter((i) => i.name !== item.name);
    console.log("Current cart:", this.items);
  }

  total() {
    const t = this.items.reduce((s, i) => s + i.price, 0);
    console.log("Calculating total:", t);
    return t;
  }
}

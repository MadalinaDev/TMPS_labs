export class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotal() {
    return this.product.price * this.quantity;
  }
}

export class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) existing.quantity += quantity;
    else this.items.push(new CartItem(product, quantity));
  }

  removeItem(productId) {
    this.items = this.items.filter((i) => i.product.id !== productId);
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.getTotal(), 0);
  }
}

export class Checkout {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  calculateTotal(cart) {
    const total = cart.getTotal();
    return this.discountStrategy.apply(total);
  }
}
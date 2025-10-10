
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotal() {
    return this.product.price * this.quantity;
  }
}

class Cart {
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

class DiscountStrategy {
  apply(total) {
    return total;
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }

  apply(total) {
    return total - (total * this.percentage) / 100;
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  apply(total) {
    return Math.max(0, total - this.amount);
  }
}

class Checkout {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  calculateTotal(cart) {
    const total = cart.getTotal();
    return this.discountStrategy.apply(total);
  }
}


const p1 = new Product(1, "Laptop", 2000);
const p2 = new Product(2, "Headphones", 200);

const cart = new Cart();
cart.addItem(p1, 1);
cart.addItem(p2, 2);

const discount = new PercentageDiscount(10); 
const checkout = new Checkout(discount);

console.log("Cart total:", cart.getTotal());
console.log("Total with discount:", checkout.calculateTotal(cart)); 

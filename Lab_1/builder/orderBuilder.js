// The Order class represents a final, ready-to-deliver order object.
class Order {
  constructor() {
    this.items = [];
    this.customerName = "";
    this.deliveryAddress = "";
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  summary() {
    return `
Customer: ${this.customerName}
Address: ${this.deliveryAddress}
Items: ${this.items.map((i) => i.name).join(", ")}
Total: ${this.getTotal()} MDL
    `;
  }
}

// ✅ Builder Pattern:
// The OrderBuilder class separates the construction of a complex object (Order)
// from its representation. It lets us create different configurations of Orders
// step-by-step, without needing a long constructor with many parameters.
export default class OrderBuilder {
  constructor() {
    this.order = new Order();
  }

  setCustomer(name) {
    this.order.customerName = name;
    return this; // allows method chaining
  }

  setAddress(address) {
    this.order.deliveryAddress = address;
    return this;
  }

  addItem(foodItem) {
    this.order.items.push(foodItem);
    return this;
  }

  // Final step: returns the fully built Order object
  build() {
    return this.order;
  }
}
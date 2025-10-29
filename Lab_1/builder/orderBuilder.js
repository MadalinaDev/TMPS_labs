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

export default class OrderBuilder {
  constructor() {
    this.order = new Order();
  }

  setCustomer(name) {
    this.order.customerName = name;
    return this;
  }

  setAddress(address) {
    this.order.deliveryAddress = address;
    return this;
  }

  addItem(foodItem) {
    this.order.items.push(foodItem);
    return this;
  }

  build() {
    return this.order;
  }
}

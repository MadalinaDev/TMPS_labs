
export class Order {
  constructor(customerName, items = []) {
    this.customerName = customerName;
    this.items = items;
    this.address = "";
    this.paymentMethod = null;
    this.status = "pending";
    this.createdAt = new Date();
  }


  addItem(item) {
    this.items.push(item);
  }


  setAddress(address) {
    this.address = address;
  }


  setPaymentMethod(method) {
    this.paymentMethod = method;
  }


  calculateTotal() {
    return this.items.reduce((total, item) => total + item.getPrice(), 0);
  }


  getSummary() {
    const itemsList = this.items
      .map(
        (item) => `  - ${item.getDescription()}: $${item.getPrice().toFixed(2)}`
      )
      .join("\n");

    return `Order for ${this.customerName}:
${itemsList}
Address: ${this.address || "Not set"}
Payment: ${this.paymentMethod || "Not set"}
Total: $${this.calculateTotal().toFixed(2)}
Status: ${this.status}`;
  }
}

// Singleton Pattern:
// The OrderManager class ensures only ONE instance exists throughout the app.
// It manages all created orders globally.
class OrderManager {
  constructor() {
    // If an instance already exists, return it (Singleton enforcement)
    if (OrderManager.instance) {
      return OrderManager.instance;
    }

    this.orders = [];

    // Store the single instance for future reference
    OrderManager.instance = this;
  }

  addOrder(order) {
    this.orders.push(order);
    console.log(`Order added for ${order.customerName}`);
  }

  listOrders() {
    console.log("\n--- All Orders ---");
    this.orders.forEach((order, index) => {
      console.log(`Order #${index + 1}:`);
      console.log(order.summary());
    });
  }
}

const instance = new OrderManager();
export default instance;
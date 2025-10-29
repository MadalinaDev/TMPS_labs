class OrderManager {
  constructor() {
    if (OrderManager.instance) {
      return OrderManager.instance;
    }

    this.orders = [];

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
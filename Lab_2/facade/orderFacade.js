
import { Pizza, Burger, Drink } from "../models/foodItem.js";
import { Order } from "../models/order.js";
import {
  ExtraCheeseDecorator,
  BaconDecorator,
  AvocadoDecorator,
  SpicyDecorator,
  ExtraLargeSizeDecorator,
  SpecialPackagingDecorator,
} from "../decorator/foodDecorator.js";


export default class OrderFacade {
  constructor() {
    this.orders = []; // Simple order storage
    this.currentOrder = null;
    this.currentItems = [];
  }

 
  startNewOrder(customerName, address) {
    console.log(`\n${customerName}:`);
    this.currentOrder = { customerName, address };
    this.currentItems = [];
    return this;
  }


  addSimpleItem(type, name, price) {
    let item;

    switch (type.toLowerCase()) {
      case "pizza":
        item = new Pizza(name, price);
        break;
      case "burger":
        item = new Burger(name, price);
        break;
      case "drink":
        item = new Drink(name, price);
        break;
      default:
        throw new Error(`Unknown food type: ${type}`);
    }

    this.currentItems.push(item);
    console.log(`  ${item.getDescription()} - $${item.getPrice().toFixed(2)}`);
    return this;
  }


  addCustomizedItem(type, name, price, customizations = []) {

    let item;
    switch (type.toLowerCase()) {
      case "pizza":
        item = new Pizza(name, price);
        break;
      case "burger":
        item = new Burger(name, price);
        break;
      case "drink":
        item = new Drink(name, price);
        break;
      default:
        throw new Error(`Unknown food type: ${type}`);
    }


    customizations.forEach((customization) => {
      switch (customization.toLowerCase()) {
        case "extracheese":
        case "extra cheese":
          item = new ExtraCheeseDecorator(item);
          break;
        case "bacon":
          item = new BaconDecorator(item);
          break;
        case "avocado":
          item = new AvocadoDecorator(item);
          break;
        case "spicy":
          item = new SpicyDecorator(item);
          break;
        case "extralarge":
        case "xl":
          item = new ExtraLargeSizeDecorator(item);
          break;
        case "ecopackaging":
        case "eco":
          item = new SpecialPackagingDecorator(item);
          break;
      }
    });

    this.currentItems.push(item);
    console.log(`  ${item.getDescription()} - $${item.getPrice().toFixed(2)}`);
    return this;
  }


  completeOrder(paymentAdapter) {
    if (!this.currentOrder) {
      throw new Error("No order in progress. Call startNewOrder() first.");
    }


    const order = new Order(this.currentOrder.customerName, this.currentItems);
    order.setAddress(this.currentOrder.address);
    const total = order.calculateTotal();

    console.log(`${paymentAdapter.getPaymentMethod()}: $${total.toFixed(2)}`);


    const paymentResult = paymentAdapter.processPayment(total);

    if (paymentResult.success) {
      order.setPaymentMethod(paymentAdapter.getPaymentMethod());
      order.status = "confirmed";


      this.orders.push(order);

      console.log(`  Success - ${paymentResult.transactionId}`);


      this.currentOrder = null;
      this.currentItems = [];

      return {
        success: true,
        order: order,
        payment: paymentResult,
      };
    } else {
      console.log(`  Failed`);
      return {
        success: false,
        error: "Payment processing failed",
      };
    }
  }


  cancelOrder() {
    console.log(`Cancelled`);
    this.currentOrder = null;
    this.currentItems = [];
  }

  getAllOrders() {
    return this.orders;
  }


  displayAllOrders() {
    console.log("\nALL ORDERS:");

    if (this.orders.length === 0) {
      console.log("None");
    } else {
      this.orders.forEach((order, index) => {
        console.log(`\n[${index + 1}] ${order.getSummary()}`);
      });
    }
  }


  getOrderStatistics() {
    const totalRevenue = this.orders.reduce(
      (sum, order) => sum + order.calculateTotal(),
      0
    );
    const totalOrders = this.orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
    };
  }


  displayStatistics() {
    const stats = this.getOrderStatistics();
    console.log("\nSTATISTICS:");
    console.log(`Orders: ${stats.totalOrders}`);
    console.log(`Revenue: $${stats.totalRevenue.toFixed(2)}`);
    console.log(`Average: $${stats.averageOrderValue.toFixed(2)}`);
  }
}

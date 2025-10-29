import FoodFactory from "../factory/foodFactory.js";
import OrderBuilder from "../builder/orderBuilder.js";
import OrderManager from "../domain/orderManager.js";

// Using Factory Method Pattern
// Create food items without directly instantiating them with new.
// This centralizes creation logic and makes it easier to extend.
const burger = FoodFactory.createFood("burger");
const soda = FoodFactory.createFood("soda");
const pizza = FoodFactory.createFood("pizza");

// Using Builder Pattern
// Construct complex Order objects step by step in a readable, flexible way.
const order1 = new OrderBuilder()
  .setCustomer("Madalina")
  .setAddress("Str. Stefan cel Mare 12, Chisinau")
  .addItem(burger)
  .addItem(soda)
  .build();

const order2 = new OrderBuilder()
  .setCustomer("Andrei")
  .setAddress("Bd. Dacia 25, Chisinau")
  .addItem(pizza)
  .addItem(soda)
  .build();

// Using Singleton Pattern
// The same OrderManager instance is used across the app.
// It stores and manages all orders globally.
OrderManager.addOrder(order1);
OrderManager.addOrder(order2);
OrderManager.listOrders();

// Using Prototype Pattern (optional demonstration)
// Clone a predefined food item and modify it slightly
const clonedPizza = pizza.clone();
clonedPizza.name = "Pizza (extra cheese)";
const customOrder = new OrderBuilder()
  .setCustomer("Ioana")
  .setAddress("Str. Ismail 33, Chisinau")
  .addItem(clonedPizza)
  .build();

OrderManager.addOrder(customOrder);
OrderManager.listOrders();

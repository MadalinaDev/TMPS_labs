import FoodFactory from "../factory/foodFactory.js";
import OrderBuilder from "../builder/orderBuilder.js";
import OrderManager from "../domain/orderManager.js";

const burger = FoodFactory.createFood("burger");
const soda = FoodFactory.createFood("soda");
const pizza = FoodFactory.createFood("pizza");

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

OrderManager.addOrder(order1);
OrderManager.addOrder(order2);

const clonedPizza = pizza.clone();
clonedPizza.name = "Pizza (extra cheese)";
const customOrder = new OrderBuilder()
  .setCustomer("Ioana")
  .setAddress("Str. Ismail 33, Chisinau")
  .addItem(clonedPizza)
  .build();

OrderManager.addOrder(customOrder);
OrderManager.listOrders();

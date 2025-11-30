import { ExpressDelivery } from "./strategy.js";
import { Restaurant, CustomerApp } from "./observer.js";
import {
  AddItemCommand,
  RemoveItemCommand,
  CheckoutCommand,
} from "./command.js";
import { Cart } from "./cart.js";
import { OrderProcessor } from "./orderProcessor.js";

// Observer
console.log("[OBSERVER] Setting up restaurant notifications ");
const restaurant = new Restaurant();
const appUI = new CustomerApp();
restaurant.subscribe(appUI);
restaurant.addMenuItem("Cheeseburger");

// Cart + Commands
console.log("\n[COMMAND] Working with cart and commands");
const cart = new Cart();
const processor = new OrderProcessor();

new AddItemCommand(cart, { name: "Pizza", price: 120 }).execute();
new AddItemCommand(cart, { name: "Coke", price: 20 }).execute();
new RemoveItemCommand(cart, { name: "Coke", price: 20 }).execute();

// Strategy + Command
console.log("\n[STRATEGY] Checkout ===");
new CheckoutCommand(processor, cart, new ExpressDelivery()).execute();


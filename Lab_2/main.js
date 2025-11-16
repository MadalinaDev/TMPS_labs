
import { Pizza, Burger, Drink } from "./models/foodItem.js";
import { Order } from "./models/order.js";
import {
  PayPalAdapter,
  StripeAdapter,
  CreditCardAdapter,
} from "./adapter/paymentAdapter.js";
import {
  ExtraCheeseDecorator,
  BaconDecorator,
  SpicyDecorator,
  ExtraLargeSizeDecorator,
  AvocadoDecorator,
  SpecialPackagingDecorator,
} from "./decorator/foodDecorator.js";
import OrderFacade from "./facade/orderFacade.js";

console.log("FOOD DELIVERY APPLICATION - LAB 2\n");


console.log("DEMO 1: Facade Pattern");

const orderSystem = new OrderFacade();

orderSystem
  .startNewOrder("John Smith", "123 Main St")
  .addSimpleItem("pizza", "Margherita Pizza", 12.99)
  .addSimpleItem("drink", "Coca Cola", 2.5)
  .completeOrder(new PayPalAdapter("john.smith@email.com"));


console.log("\nDEMO 2: Decorator Pattern");

orderSystem
  .startNewOrder("Alice Johnson", "456 Oak Avenue")
  .addCustomizedItem("burger", "Classic Burger", 8.99, ["bacon", "extraCheese"])
  .addCustomizedItem("pizza", "Pepperoni Pizza", 14.99, ["spicy", "xl"])
  .completeOrder(new StripeAdapter("tok_visa_4242"));


console.log("\nDEMO 3: Direct Usage");


let pizza = new Pizza("Supreme Pizza", 15.99);
pizza = new ExtraCheeseDecorator(pizza);
pizza = new BaconDecorator(pizza);
console.log(`  ${pizza.getDescription()} - $${pizza.getPrice().toFixed(2)}`);


const order = new Order("Bob Williams", [pizza]);
order.setAddress("789 Pine Road");

const cardPayment = new CreditCardAdapter("4532123456789012", "123");
const paymentResult = cardPayment.processPayment(order.calculateTotal());

if (paymentResult.success) {
  console.log(`  Success - ${paymentResult.transactionId}`);
}


console.log("\nPATTERNS USED:");
console.log("- Adapter: Unified payment interface");
console.log("- Decorator: Dynamic features");
console.log("- Facade: Simplified ordering");

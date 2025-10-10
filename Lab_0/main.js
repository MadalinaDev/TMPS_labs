import { Product } from "./product.js";
import { FixedDiscount, PercentageDiscount } from "./discount.js";
import { Cart, Checkout } from "./cart.js";

const p1 = new Product(1, "Laptop", 2000);
const p2 = new Product(2, "Headphones", 200);

const cart = new Cart();
cart.addItem(p1, 1);
cart.addItem(p2, 2);

const discount = new PercentageDiscount(10); 
const checkout = new Checkout(discount);

console.log("Cart total:", cart.getTotal());
console.log("Total with discount:", checkout.calculateTotal(cart)); 

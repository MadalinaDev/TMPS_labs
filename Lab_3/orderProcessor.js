export class OrderProcessor {
  checkout(cart, strategy) {
    console.log("Checkout started...");
    const price = cart.total();
    const finalPrice = strategy.calculate(price);

    console.log("Base price:", price);
    console.log("Delivery strategy:", strategy.constructor.name);
    console.log("Final total:", finalPrice);
  }
}

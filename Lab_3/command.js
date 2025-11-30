export class AddItemCommand {
  constructor(cart, item) {
    this.cart = cart;
    this.item = item;
  }
  execute() {
    console.log("[COMMAND] AddItemCommand executing...");
    this.cart.add(this.item);
  }
}

export class RemoveItemCommand {
  constructor(cart, item) {
    this.cart = cart;
    this.item = item;
  }
  execute() {
    console.log("[COMMAND] RemoveItemCommand executing...");
    this.cart.remove(this.item);
  }
}

export class CheckoutCommand {
  constructor(processor, cart, strategy) {
    this.processor = processor;
    this.cart = cart;
    this.strategy = strategy;
  }
  execute() {
    console.log("[COMMAND] CheckoutCommand executing...");
    this.processor.checkout(this.cart, this.strategy);
  }
}

// The FoodItem class represents a basic product in our system (a meal, drink, etc.)
export default class FoodItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Prototype Pattern (optional):
  // Allows cloning an existing FoodItem to create a new one with the same properties.
  clone() {
    return new FoodItem(this.name, this.price);
  }
}

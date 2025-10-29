import FoodItem from "../models/foodItem.js";

export default class FoodFactory {
  static createFood(type) {
    switch (type.toLowerCase()) {
      case "burger":
        return new FoodItem("Burger", 80);
      case "pizza":
        return new FoodItem("Pizza", 120);
      case "salad":
        return new FoodItem("Salad", 60);
      case "soda":
        return new FoodItem("Soda", 25);
      default:
        throw new Error(`Unknown food type: ${type}`);
    }
  }
}


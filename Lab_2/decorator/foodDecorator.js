
import { FoodItem } from "../models/foodItem.js";


export class FoodDecorator extends FoodItem {
  constructor(foodItem) {
    super(foodItem.name, foodItem.price);
    this.foodItem = foodItem; 
  }


  getDescription() {
    return this.foodItem.getDescription();
  }


  getPrice() {
    return this.foodItem.getPrice();
  }
}


export class ExtraCheeseDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.extraCost = 1.5;
  }

  getDescription() {

    return `${this.foodItem.getDescription()} + Extra Cheese`;
  }

  getPrice() {

    return this.foodItem.getPrice() + this.extraCost;
  }
}


export class BaconDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.extraCost = 2.0;
  }

  getDescription() {
    return `${this.foodItem.getDescription()} + Bacon`;
  }

  getPrice() {
    return this.foodItem.getPrice() + this.extraCost;
  }
}


export class AvocadoDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.extraCost = 1.75;
  }

  getDescription() {
    return `${this.foodItem.getDescription()} + Avocado`;
  }

  getPrice() {
    return this.foodItem.getPrice() + this.extraCost;
  }
}


export class ExtraLargeSizeDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.multiplier = 1.5; 
  }

  getDescription() {
    return `${this.foodItem.getDescription()} [EXTRA LARGE]`;
  }

  getPrice() {
    return this.foodItem.getPrice() * this.multiplier;
  }
}


export class SpecialPackagingDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.extraCost = 0.75;
  }

  getDescription() {
    return `${this.foodItem.getDescription()} (Eco-Friendly Packaging)`;
  }

  getPrice() {
    return this.foodItem.getPrice() + this.extraCost;
  }
}


export class SpicyDecorator extends FoodDecorator {
  constructor(foodItem) {
    super(foodItem);
    this.extraCost = 0.5;
  }

  getDescription() {
    return `${this.foodItem.getDescription()} [SPICY]`;
  }

  getPrice() {
    return this.foodItem.getPrice() + this.extraCost;
  }
}

export function applyDecorators(foodItem, decorators) {
  return decorators.reduce((item, DecoratorClass) => {
    return new DecoratorClass(item);
  }, foodItem);
}


export class FoodItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }


  getDescription() {
    return `${this.name}`;
  }


  getPrice() {
    return this.price;
  }
}

export class Pizza extends FoodItem {
  constructor(name, price) {
    super(name, price);
    this.type = "Pizza";
  }

  getDescription() {
    return `${this.type}: ${this.name}`;
  }
}


export class Burger extends FoodItem {
  constructor(name, price) {
    super(name, price);
    this.type = "Burger";
  }

  getDescription() {
    return `${this.type}: ${this.name}`;
  }
}


export class Drink extends FoodItem {
  constructor(name, price) {
    super(name, price);
    this.type = "Drink";
  }

  getDescription() {
    return `${this.type}: ${this.name}`;
  }
}

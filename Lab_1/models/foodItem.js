export default class FoodItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  
  clone() {
    return new FoodItem(this.name, this.price);
  }
}

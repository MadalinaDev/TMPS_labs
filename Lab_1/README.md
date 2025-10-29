# Creational Design Patterns


## Author: Madalina Chirpicinic, FAF-233

----

## Objectives

* Study and understand the Creational Design Patterns
* Choose a domain, define its main classes/models/entities and choose the appropriate instantiation mechanisms.
* Use some creational design patterns for object instantiation in a sample project.


## Theoretical Considerations

1. Singleton Pattern - provides that only one instance of a class exists at any time. Also provides a single point of access to it. It has a private constructor. It has a static encapsualted instance. For a multithreaded environment, the getInstance() method should be ensured to be thread-safe. If the object has already been instantiated from the class, the existing instance of the obejct will be returned back. An example use case of the Singleton Pattern would be when we would want to create a single instance of a database that we would later use.

2. Factory Method Pattern - creates an instance out of several derived classes.

3. Abstract Factory Pattern - 

4. Builder Method Pattern - allows the creation of complex objects on a step-by-step process. Separates object constructon from its representation so that the same construction process could create different representations.

## Used Design Patterns


## Implementation

In this project, a Food Delivery Application, I used three creational design patterns: Singleton, Factory Method, and Builder.
Each pattern plays a specific role in how the app creates and manages objects.

1. Singleton Pattern
Used in the OrderManager class to ensure only one global instance manages all orders.
```js
export default class OrderManager {
  constructor() {
    if (OrderManager.instance) return OrderManager.instance;
    this.orders = [];
    OrderManager.instance = this;
  }
}
```
We only need one order manager to handle all placed orders consistently throughout the app.

2. Factory Method Pattern
Used in the FoodFactory to create food items dynamically based on type.
```js
export default class FoodFactory {
  static createFood(type, name, price) {
    if (type === "pizza") return new Pizza(name, price);
    if (type === "burger") return new Burger(name, price);
    if (type === "drink") return new Drink(name, price);
  }
}
```
It centralizes and simplifies the creation logic for different food types.

3. Builder Pattern
Used in OrderBuilder to construct complex Order objects step-by-step.
```js
class OrderBuilder {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); return this; }
  setCustomer(name) { this.customerName = name; return this; }
  build() { return new Order(this.customerName, this.items); }
}
```
This makes it easy to add customization (for example, multiple food items or customer details) before building a complete order.


The following screenshots showcase the execution of the Food Delivery Application in the terminal. The code demonstrates the use of creational design patterns: the Factory Method creates different food items (burger, pizza, soda), the Builder constructs complex Order objects step-by-step including customer details and multiple items, and the Singleton ensures all orders are managed through a single global OrderManager instance. Additionally, the Prototype pattern is demonstrated by cloning an existing pizza and customizing it. The terminal output displays the orders, their items, customers, addresses, and total prices, reflecting the correct creation and management of objects across the application.

![Terminal Output](screenshots/output.png)

As a summary, the following creational design patterns were implemented in the food delivery application by applying the following strategy:
* Singleton: One global order manager.
* Factory Method: Centralized creation of food items.
* Builder: Step-by-step creation of complex orders.

These patterns ensure flexible, maintainable, and scalable object creation within the food delivery domain.

## Conclusions / Screenshots / Results

In conclusion,
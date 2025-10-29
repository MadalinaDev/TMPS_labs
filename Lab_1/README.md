# Creational Design Patterns


## Author: Madalina Chirpicinic, FAF-233

----

## Objectives

* Study and understand the Creational Design Patterns
* Choose a domain, define its main classes/models/entities and choose the appropriate instantiation mechanisms.
* Use some creational design patterns for object instantiation in a sample project.


## Theoretical Considerations

In software engineering, the creational design patterns are the general solutions that deal with object creation, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by optimizing, hiding or controlling the object creation.

Some examples of this kind of design patterns are:

1. **Singleton Pattern** - provides that only one instance of a class exists at any time. Also provides a single point of access to it. It has a private constructor. It has a static encapsualted instance. For a multithreaded environment, the getInstance() method should be ensured to be thread-safe. If the object has already been instantiated from the class, the existing instance of the obejct will be returned back. An example use case of the Singleton Pattern would be when we would want to create a single instance of a database that we would later use.

2. **Factory Method Pattern** - creates an instance out of several derived classes.

3. **Abstract Factory Pattern** - provides an interface for creating families of related or dependent objects without specifying their concrete classes. It ensures that products created by the factory are compatible with each other.

4. **Builder Pattern** - allows the creation of complex objects on a step-by-step process. Separates object constructon from its representation so that the same construction process could create different representations.

5. **Prototype Pattern** - creates new objects by copying or cloning existing ones, allowing efficient creation of objects with similar properties without starting from scratch.

6. **Object Pooling Pattern** - manages a set of reusable objects to avoid costly creation and destruction. Objects are checked out from the pool when needed and returned after use.

## Used Design Patterns

The domain area implemented for this project is a food delivery application. The following creational design patterns have been implemented in order to optimize, hide, and control the object creation:
* Singleton Pattern
* Factory Method Pattern 
* Builder Pathern

Below, in the next section, a more detailed description of how each creational design pattern was implemented in the food delivert application is provided.

## Implementation

In this project, a Food Delivery Application, I used three creational design patterns: Singleton, Factory Method, and Builder.
Each pattern plays a specific role in how the app creates and manages objects.

1. Singleton Pattern
Used in the OrderManager class to ensure only one global instance manages all orders.
OrderManager.instance is a static property of the class (attached to the class itself, not each object). If an instance already exists, it returns the existing instance instead of creating a new one. If no instance exists yet, it initializes this.orders and saves the current instance to OrderManager.instance:
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
This class encapsulates the logic of object creation for different FoodItem types. Instead of calling `new FoodItem()` everywhere, we centralize creation here.
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
The OrderBuilder class separates the construction of a complex object (Order) from its representation. It lets us create different configurations of Orders step-by-step, without needing a long constructor with many parameters.
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

In conclusion, this project has successfully demonstrated the practical application of creational design patterns within a Food Delivery Application. By using the Singleton Pattern, the system maintains a single, consistent OrderManager instance that oversees all orders. The Factory Method Pattern simplifies and centralizes the creation of various food items, making it easy to extend the menu with new products. The Builder Pattern provides a flexible way to construct complex orders step-by-step, allowing customization of customer details and multiple items. Together, these patterns improve the flexibility, maintainability, and scalability of the application, ensuring that object creation is controlled, efficient, and easy to manage. The terminal output and screenshots confirm that the application correctly creates, manages, and displays orders, reflecting the proper implementation of these design patterns.
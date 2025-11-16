# Structural Design Patterns

## Author: Madalina Chirpicinic, FAF-233

---

## Objectives

- Study and understand the Structural Design Patterns
- As a continuation of the previous laboratory work, think about the functionalities that your system will need to provide to the user
- Implement some additional functionalities using structural design patterns

## Theoretical Considerations

In software engineering, the Structural Design Patterns are concerned with how classes and objects are composed to form larger structures. Structural class patterns use inheritance to create a hierarchy of classes/abstractions, but the structural object patterns use composition which is generally a more flexible alternative to inheritance.

Some examples of this kind of design patterns are:

1. **Adapter Pattern** - allows incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by wrapping an existing class with a new interface.

2. **Bridge Pattern** - decouples an abstraction from its implementation so that the two can vary independently.

3. **Composite Pattern** - composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

4. **Decorator Pattern** - attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

5. **Facade Pattern** - provides a unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use.

6. **Flyweight Pattern** - uses sharing to support large numbers of fine-grained objects efficiently.

7. **Proxy Pattern** - provides a surrogate or placeholder for another object to control access to it.

## Used Design Patterns

The domain area implemented for this project is a food delivery application (continuation from Lab_1). The following structural design patterns have been implemented to enhance the system's functionality:

- Adapter Pattern
- Decorator Pattern
- Facade Pattern

Below, in the next section, a more detailed description of how each structural design pattern was implemented in the food delivery application is provided.

## Implementation

In this project, I extended the Food Delivery Application from Lab_1 by implementing three structural design patterns: Adapter, Decorator, and Facade. Each pattern enhances the system's functionality and makes it more flexible and maintainable.

### 1. Adapter Pattern

**Location:** `adapter/paymentAdapter.js`

The Adapter Pattern allows our system to work with different payment providers (PayPal, Stripe, Credit Card) through a unified interface. Each payment system has its own API, but our adapters translate them into a common interface.

**Implementation:**

```js
// Base payment processor interface
class PaymentProcessor {
  processPayment(amount) {
    throw new Error("Method must be implemented");
  }
}

// PayPal Adapter - adapts PayPal's API to our interface
class PayPalAdapter extends PaymentProcessor {
  constructor(email) {
    super();
    this.email = email;
  }

  processPayment(amount) {
    console.log(`Processing PayPal payment of $${amount.toFixed(2)}`);
    console.log(`Account: ${this.email}`);
    return true;
  }
}
```

**Why it's useful:** Each payment provider has different APIs and methods. The Adapter Pattern allows us to integrate multiple payment systems without changing our core order processing logic. We can easily add new payment providers by creating new adapters.

### 2. Decorator Pattern

**Location:** `decorator/foodDecorator.js`

The Decorator Pattern allows us to dynamically add features and toppings to food items without modifying their original classes. We can stack multiple decorators to create customized items.

**Implementation:**

```js
// Base decorator class
class FoodDecorator {
  constructor(foodItem) {
    this.foodItem = foodItem; // Wrap the original food item
  }

  getDescription() {
    return this.foodItem.getDescription();
  }

  getPrice() {
    return this.foodItem.getPrice();
  }
}

// Extra Cheese Decorator - adds extra cheese
class ExtraCheeseDecorator extends FoodDecorator {
  getDescription() {
    return this.foodItem.getDescription() + " + Extra Cheese";
  }

  getPrice() {
    return this.foodItem.getPrice() + 1.5; // Add $1.50 for extra cheese
  }
}
```

**Why it's useful:** Instead of creating separate classes for every possible combination (e.g., PizzaWithCheese, PizzaWithCheeseAndBacon, etc.), we can dynamically add features at runtime. This makes the code more flexible and easier to maintain. We implemented decorators for: extra cheese, bacon, spicy sauce, extra-large size, avocado, and eco-friendly packaging.

### 3. Facade Pattern

**Location:** `facade/orderFacade.js`

The Facade Pattern provides a simplified interface to the complex subsystems in our application (OrderManager, FoodFactory, OrderBuilder, decorators, and payment processing).

**Implementation:**

```js
export default class OrderFacade {
  constructor() {
    // Initialize all subsystems
    this.orderManager = new OrderManager();
    this.currentOrderBuilder = null;
  }

  // Simplified method to start a new order
  startNewOrder(customerName, address) {
    this.currentOrderBuilder = new OrderBuilder()
      .setCustomer(customerName)
      .setDeliveryAddress(address);
    return this;
  }

  // Simplified method to add items with decorators
  addCustomizedItem(type, name, price, customizations = []) {
    let foodItem = FoodFactory.createFood(type, name, price);
    foodItem = applyDecorators(foodItem, customizations);
    this.currentOrderBuilder.addItem(foodItem);
    return this;
  }

  // Simplified method to complete and pay for order
  completeOrder(paymentAdapter) {
    const order = this.currentOrderBuilder.build();
    this.orderManager.placeOrder(order);
    paymentAdapter.processPayment(order.getTotalPrice());
    return this;
  }
}
```

**Why it's useful:** The client doesn't need to know about the internal complexity of creating orders, applying decorators, managing orders, and processing payments. The facade provides a simple, fluent interface that chains method calls together. This makes the code in `main.js` much cleaner and easier to understand.

### Client Code

**Location:** `main.js`

The client code demonstrates all three structural patterns working together:

```js
// Create facade - hides complexity
const orderSystem = new OrderFacade();

// Simple, fluent interface to create complex orders
orderSystem
  .startNewOrder("John Smith", "123 Main St")
  .addCustomizedItem("pizza", "Margherita", 12.99, ["bacon", "extraCheese"])
  .addSimpleItem("drink", "Coca Cola", 2.5)
  .completeOrder(new PayPalAdapter("john@email.com"));
```

## Results / Screenshots / Conclusions

The implementation successfully demonstrates three structural design patterns working together in a food delivery application:

1. **Adapter Pattern**: Enables integration with multiple payment providers (PayPal, Stripe, Credit Card) through a unified interface, making it easy to add new payment methods.

2. **Decorator Pattern**: Allows dynamic customization of food items with various toppings and features without creating numerous subclasses.

3. **Facade Pattern**: Simplifies the complex order creation process by providing a clean, fluent interface that hides the complexity of multiple subsystems.

These three structural patterns create a flexible, maintainable, and scalable food delivery system. The code is well-organized into logical directories (adapter, decorator, facade, models), making it easy to understand and extend.

The terminal output demonstrates:

- Multiple orders with different customizations
- Different payment methods being used
- Decorators dynamically adding features to food items
- The facade simplifying complex operations
- Order statistics and summaries

**Key Benefits Achieved:**

- **Flexibility**: Easy to add new payment providers, decorators, or features
- **Maintainability**: Well-organized code with clear responsibilities
- **Simplicity**: Complex operations hidden behind simple interfaces
- **Scalability**: System can grow without major refactoring

This laboratory work successfully demonstrates the power of structural design patterns in creating robust, maintainable software systems.

# Behavioral Design Patterns

## Author: Madalina Chirpicinic, FAF-233

---

## Objectives

* Study and understand the Behavioral Design Patterns
* Extend the Food Delivery Application developed in previous labs
* Implement 3 behavioral design patterns from the required list
* Demonstrate how these patterns improve flexibility, reusability, and organization of system logic

---

## Theoretical Considerations

Behavioral Design Patterns focus on **how objects communicate**, how responsibilities are distributed, and how the flow of control moves through the system. These patterns help structure interactions between objects in a clean, maintainable way.

Some examples of common behavioral patterns include:

1. **Chain of Responsibility** – passes a request along a chain of handlers until one processes it
2. **Command** – encapsulates a request as an object
3. **Interpreter** – defines a grammar and an interpreter for it
4. **Iterator** – allows sequential traversal over a collection
5. **Mediator** – centralizes complex communication between objects
6. **Memento** – captures and restores object state
7. **Observer** – notifies dependent objects automatically about changes
8. **State** – changes behavior based on internal state
9. **Strategy** – encapsulates interchangeable algorithms
10. **Template Method** – defines a skeleton of an algorithm
11. **Visitor** – separates operations from object structure

---

## Used Design Patterns

For this laboratory work, the following **three behavioral patterns** were implemented:

* **Observer Pattern**
* **Command Pattern**
* **Strategy Pattern**

These were integrated into a small **Food Delivery Application**, demonstrating how behavioral patterns simplify interactions and make systems more flexible.

---

## Implementation

The system consists of a food ordering flow where users receive restaurant notifications, perform actions on the cart using commands, and choose a delivery strategy at checkout.

Below are the implementations of the three behavioral patterns.

---

## 1. Observer Pattern

**Location:** `observer.js`

The Observer Pattern allows the restaurant to notify all subscribed users when something changes — in this case, when a new menu item is added.

### **Implementation**

```js
export class Restaurant {
  constructor() {
    this.subs = [];
    console.log("Restaurant created.");
  }

  subscribe(o) {
    console.log("New subscriber added:", o.constructor.name);
    this.subs.push(o);
  }

  notify(msg) {
    console.log("Notifying subscribers:", msg);
    this.subs.forEach(s => s.update(msg));
  }

  addMenuItem(item) {
    console.log("Restaurant added new menu item:", item);
    this.notify("New item: " + item);
  }
}

export class CustomerApp {
  update(msg) {
    console.log("[APP RECEIVED NOTIFICATION]:", msg);
  }
}
```

### **Why it’s useful**

* The restaurant does **not need to know** how many apps are subscribed or who they are
* New subscribers can join without modifying existing code
* Perfect for live updates and event-driven systems

---

## 2. Command Pattern

**Location:** `command.js`

The Command Pattern encapsulates actions (add item, remove item, checkout) as objects.
This allows storing, logging, reusing, or even undoing actions.

### **Implementation**

```js
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
```

### **Why it’s useful**

* Each user action becomes an object
* Easy to add history, undo, or queue actions
* Clean separation of UI logic from business logic

---

## 3. Strategy Pattern

**Location:** `strategy.js`

The Strategy Pattern is used to apply different **delivery pricing algorithms** (express delivery, slow delivery, free delivery, etc.).

### **Implementation**

Example: Express Delivery Strategy

```js
export class ExpressDelivery {
  calculate(price) {
    return price + 30;
  }
}
```

### **Why it’s useful**

* Strategies are interchangeable
* Adding new delivery algorithms does *not* require modifying existing code
* Checkout simply receives whichever strategy is chosen

---

## Client Code Demonstration

**Location:** `index.js`

This is where all three patterns work together:

```js
console.log("[OBSERVER] Setting up restaurant notifications ");
const restaurant = new Restaurant();
const appUI = new CustomerApp();
restaurant.subscribe(appUI);
restaurant.addMenuItem("Cheeseburger");

console.log("\n[COMMAND] Working with cart and commands");
const cart = new Cart();
const processor = new OrderProcessor();

new AddItemCommand(cart, { name: "Pizza", price: 120 }).execute();
new AddItemCommand(cart, { name: "Coke", price: 20 }).execute();
new RemoveItemCommand(cart, { name: "Coke", price: 20 }).execute();

console.log("\n[STRATEGY] Checkout ===");
new CheckoutCommand(processor, cart, new ExpressDelivery()).execute();
```

---

## Results / Screenshots / Conclusions

The implementation demonstrates how behavioral patterns improve system organization and flexibility.

### **Observer Pattern**

* Restaurant broadcasts updates
* Customer app receives live notifications
* New subscribers can be added without modifying the restaurant class

### **Command Pattern**

* User actions (add item, remove item, checkout) become executable objects
* Each command emits logs for debugging
* Future extension: undo, redo, action history

### **Strategy Pattern**

* Delivery pricing can change dynamically
* New delivery algorithms are trivial to add
* Checkout logic stays clean and stable

### **Overall Benefits**

* **Flexibility:** Easy to add new behaviors without rewriting code
* **Clean Architecture:** Each pattern separates responsibilities
* **Scalability:** More commands, strategies, or observers can be added anytime
* **Maintainability:** Code is readable and follows established design principles

This laboratory work successfully demonstrates three behavioral design patterns working together in a functional food delivery system, offering a clear example of how behavioral patterns improve real-world software architecture.

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
    this.subs.forEach((s) => s.update(msg));
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

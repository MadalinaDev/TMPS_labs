class DiscountStrategy {
  apply(total) {
    return total;
  }
}

export class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }

  apply(total) {
    return total - (total * this.percentage) / 100;
  }
}

export class FixedDiscount extends DiscountStrategy {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  apply(total) {
    return Math.max(0, total - this.amount);
  }
}
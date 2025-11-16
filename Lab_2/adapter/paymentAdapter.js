
export class PaymentProcessor {

   
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented");
  }


  getPaymentMethod() {
    throw new Error("Method 'getPaymentMethod()' must be implemented");
  }
}


export class PayPalAPI {
  sendPayment(email, total) {

    console.log(`  API: PayPal $${total.toFixed(2)}`);
    return {
      success: true,
      transactionId: `PP-${Math.random().toString(36).substr(2, 9)}`,
      service: "PayPal",
    };
  }
}

export class StripeAPI {
  charge(token, amountInCents) {

    console.log(`  API: Stripe ${amountInCents} cents`);
    return {
      status: "charged",
      id: `stripe_${Math.random().toString(36).substr(2, 9)}`,
      processor: "Stripe",
    };
  }
}

export class CreditCardAPI {
  makePayment(cardNumber, cvv, amount) {

    const maskedCard = `****${cardNumber.slice(-4)}`;
    console.log(`  API: Card $${amount.toFixed(2)} (${maskedCard})`);
    return {
      approved: true,
      referenceNumber: `CC-${Math.random().toString(36).substr(2, 9)}`,
      type: "CreditCard",
    };
  }
}

export class PayPalAdapter extends PaymentProcessor {
  constructor(email) {
    super();
    this.paypal = new PayPalAPI();
    this.email = email;
  }

  processPayment(amount) {

    const result = this.paypal.sendPayment(this.email, amount);
    return {
      success: result.success,
      transactionId: result.transactionId,
      method: "PayPal",
    };
  }

  getPaymentMethod() {
    return "PayPal";
  }
}


export class StripeAdapter extends PaymentProcessor {
  constructor(token) {
    super();
    this.stripe = new StripeAPI();
    this.token = token;
  }

  processPayment(amount) {

    const amountInCents = Math.round(amount * 100);
    const result = this.stripe.charge(this.token, amountInCents);
    return {
      success: result.status === "charged",
      transactionId: result.id,
      method: "Stripe",
    };
  }

  getPaymentMethod() {
    return "Stripe";
  }
}


export class CreditCardAdapter extends PaymentProcessor {
  constructor(cardNumber, cvv) {
    super();
    this.creditCard = new CreditCardAPI();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  processPayment(amount) {

    const result = this.creditCard.makePayment(
      this.cardNumber,
      this.cvv,
      amount
    );
    return {
      success: result.approved,
      transactionId: result.referenceNumber,
      method: "Credit Card",
    };
  }

  getPaymentMethod() {
    return "Credit Card";
  }
}

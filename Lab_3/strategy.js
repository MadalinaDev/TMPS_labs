export class StandardDelivery {
  calculate(p) {
    return p + 20;
  }
}

export class ExpressDelivery {
  calculate(p) {
    return p + 40;
  }
}

export class FreeDelivery {
  calculate(p) {
    return p;
  }
}

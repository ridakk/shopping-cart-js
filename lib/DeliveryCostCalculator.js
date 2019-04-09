'use strict';

module.exports = class DeliveryCostCalculator {
  constructor(costPerDelivery, costPerProduct, fixedCost) {
    this.costPerDelivery = costPerDelivery;
    this.costPerProduct = costPerProduct;
    this.fixedCost = fixedCost;
  }

  calculateFor(cart) {
  }
};

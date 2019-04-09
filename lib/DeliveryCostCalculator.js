'use strict';

module.exports = class DeliveryCostCalculator {
  constructor(costPerDelivery, costPerProduct, fixedCost = 2.99) {
    this.costPerDelivery = costPerDelivery;
    this.costPerProduct = costPerProduct;
    this.fixedCost = fixedCost;
  }

  calculateFor(cart) {
    const mumberOfDeliveries = cart.getNumberOfDistinctCategories();
    const numberOfProducts = cart.getNumberOfDistinctProducts();
    return (this.CostPerDelivery * mumberOfDeliveries)
      + (this.costPerProduct * numberOfProducts)
      + this.fixedCost;
  }
};

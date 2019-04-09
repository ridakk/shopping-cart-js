'use strict';

module.exports = class Cart {
  constructor() {
    this.items = [];
    this.discounts = [];
    this.coupons = [];
    this.total = 0;
  }

  // TODO: add same product with different quantity
  // 1- add as seperate
  // 2- combine with previous one
  addItem(product, quantity) {
    this.items.push({
      item: product,
      quantity,
    });
    this.total += product.price * quantity;
  }

  applyDiscounts(discount) {
    if (this.discounts.includes(discount)) {
      return;
    }

    this.discounts.push(discount);
  }

  applyCoupon(coupon) {
    if (this.coupons.includes(coupon)) {
      return;
    }

    this.coupons.push(coupon);
  }

  getTotalAmountAfterDiscounts() {
  }

  getCouponDiscount() {
  }

  getCampaignDiscount() {
  }

  getDeliveryCost() {
  }
};

'use strict';

module.exports = class Cart {
  constructor() {
    this.items = [];
    this.campaigns = [];
    this.coupons = [];
    this.total = 0;
    this.totalCampaignDiscounts = 0;
    this.totalCouponDiscounts = 0;
    this.distinctCategories = [];
    this.distinctProducts = [];
  }

  // TODO: add same product with different quantity
  // 1- add as seperate
  // 2- combine with previous one
  addItem(product, quantity) {
    this.items.push({
      product,
      quantity,
    });

    if (!this.distinctCategories.includes(product.category.hash)) {
      this.distinctCategories.push(product.category.hash);
    }

    if (!this.distinctProducts.includes(product.hash)) {
      this.distinctProducts.push(product.hash);
    }

    this.total += (product.price * quantity);
  }

  applyDiscounts(campaign) {
    if (this.campaigns.includes(campaign)) {
      return;
    }

    this.campaigns.push(campaign);
  }

  applyCoupon(coupon) {
    if (this.coupons.includes(coupon)) {
      return;
    }

    this.coupons.push(coupon);
  }

  getNumberOfDistinctCategories() {
    return this.distinctCategories.length;
  }

  getNumberOfDistinctProducts() {
    return this.distinctProducts.length;
  }

  getTotalAmountAfterDiscounts() {
    return this.total - this.totalCouponDiscounts - this.totalCampaignDiscounts;
  }

  getCouponDiscount() {
    return this.totalCouponDiscounts;
  }

  getCampaignDiscount() {
    return this.totalCampaignDiscounts;
  }

  getDeliveryCost() {
  }

  print() {
    this.items.sort((a, b) => {
      return a.product.category.hash > b.product.category.hash;
    });

    let str = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.items) {
      str += `${item.product.print()} quantity: ${item.quantity}\n`;
    }

    str += `total price: ${this.total}\n`;
    str += `campaign discount: ${this.totalCampaignDiscounts}\n`;
    str += `coupon discount: ${this.totalCouponDiscounts}\n`;
    str += `total amount: ${this.getTotalAmountAfterDiscounts()}\n`;

    return str;
  }
};

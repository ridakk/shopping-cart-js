'use strict';

const DiscountType = require('./DiscountType');

module.exports = class Cart {
  constructor() {
    this.items = [];
    this.campaigns = [];
    this.coupons = [];
    this.total = {
      all: 0,
    };
    this.totalCampaignDiscounts = 0;
    this.totalCouponDiscounts = 0;
    this.distinctCategories = [];
    this.distinctProducts = [];
  }

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

    if (this.total[product.category.title]) {
      this.total[product.category.title] = 0;
    }

    this.total[product.category.title] += (product.price * quantity);
    this.total.all += (product.price * quantity);
  }

  applyDiscounts(...discounts) {
    for (const discount of discounts) {
      if (!this.campaigns.includes(discount)) {
        const foundApplicableItem = this.items.find((item) => {
          return discount.category.title === item.product.category.title
            && discount.count <= item.quantity;
        });

        if (foundApplicableItem) {
          this.campaigns.push(discount);
        }
      }
    }

    // put RATE types in lower index
    this.campaigns.sort((a, b) => {
      if (a.type === b.type) {
        return 0;
      }
      return a.type > b.type ? 1 : -1;
    });

    const amountCampaigns = [];
    for (const campaign of this.campaigns) {
      if (campaign.type === DiscountType.RATE) {
        const discount = this.total[campaign.category.title] * campaign.rateOrAmount / 100;
        this.total[campaign.category.title] -= discount;
        this.totalCampaignDiscounts += discount;
      } else {
        amountCampaigns.push(campaign);
      }
    }

    for (const amountCampaign of amountCampaigns) {
      const discount = this.total[amountCampaign.category.title] - amountCampaign.rateOrAmount;
      if (discount < 0) {
        this.totalCampaignDiscounts += this.total[amountCampaign.category.title];
        this.total[amountCampaign.category.title] = 0;
      } else {
        this.total[amountCampaign.category.title] -= discount;
        this.totalCampaignDiscounts += discount;
      }
    }
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
    return this.total.all - this.totalCouponDiscounts - this.totalCampaignDiscounts;
  }

  getCouponDiscount() {
    return this.totalCouponDiscounts;
  }

  getCampaignDiscount() {
    return this.totalCampaignDiscounts;
  }

  print() {
    this.items.sort((a, b) => {
      return a.product.category.hash > b.product.category.hash;
    });

    let str = '';
    for (const item of this.items) {
      str += `${item.product.print()} quantity: ${item.quantity}\n`;
    }

    str += `total price: ${this.total.all}\n`;
    str += `campaign discount: ${this.totalCampaignDiscounts}\n`;
    str += `coupon discount: ${this.totalCouponDiscounts}\n`;
    str += `total amount: ${this.getTotalAmountAfterDiscounts()}\n`;

    return str;
  }
};

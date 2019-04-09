'use strict';

module.exports = class Coupon {
  constructor(minAmount, rateOrAmount, type) {
    this.minAmount = minAmount;
    this.rateOrAmount = rateOrAmount;
    this.type = type;
  }
};

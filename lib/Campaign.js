'use strict';

module.exports = class Campaign {
  constructor(category, rateOrAmount, count, type) {
    this.category = category;
    this.rateOrAmount = rateOrAmount;
    this.count = count;
    this.type = type;
  }
};

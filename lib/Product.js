'use strict';

module.exports = class Product {
  constructor(title, price, category) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.hash = Buffer.from(`${title}${this.price}${this.category.hash}`).toString('base64');
  }

  print() {
    return `category: ${this.category.title} product: ${this.title} price: ${this.price}`;
  }
};

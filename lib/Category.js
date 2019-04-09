'use strict';

module.exports = class Category {
  constructor(title, parent) {
    this.title = title;
    this.parent = parent;
    this.hash = Buffer.from(`${title}${this.parent ? this.parent.title : ''}`).toString('base64');
  }
};

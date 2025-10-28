const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "High-end gaming laptop",
    price: 1500,
    category: "electronics",
    inStock: true
  }
];

module.exports = products;

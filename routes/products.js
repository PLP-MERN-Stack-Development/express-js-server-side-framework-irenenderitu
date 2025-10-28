const express = require('express');
const router = express.Router();
const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');

// GET /api/products - list all with filtering, pagination, search
router.get('/', (req, res) => {
  let result = [...products];
  const { category, search, page = 1, limit = 5 } = req.query;

  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page: Number(page),
    limit: Number(limit),
    products: paginated
  });
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted: deleted[0] });
});

// GET /api/products/stats/all
router.get('/stats/all', (req, res) => {
  const stats = {};
  for (const p of products) stats[p.category] = (stats[p.category] || 0) + 1;
  res.json(stats);
});

module.exports = router;

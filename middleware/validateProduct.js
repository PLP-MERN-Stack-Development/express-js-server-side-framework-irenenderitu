const { ValidationError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || typeof inStock !== 'boolean') {
    return next(new ValidationError('All product fields are required and must be valid.'));
  }
  next();
};

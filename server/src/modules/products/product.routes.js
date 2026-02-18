const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const validate = require('../../shared/validateResource');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./product.schema.zod');
const { protect, authorize } = require('../../middleware/auth');

// Routes
router.get('/dummy', productController.getDummyProducts);

router
  .route('/')
  .get(productController.getProducts)
  .get(productController.getProducts)
  .post(protect, authorize('admin'), validate(createProductSchema), productController.createProduct);

router
  .route('/:id')
  .get(validate(getProductSchema), productController.getProduct)
  .get(validate(getProductSchema), productController.getProduct)
  .put(protect, authorize('admin'), validate(updateProductSchema), productController.updateProduct)
  .delete(protect, authorize('admin'), validate(getProductSchema), productController.deleteProduct);

module.exports = router;

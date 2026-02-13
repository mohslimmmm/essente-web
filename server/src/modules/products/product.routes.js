const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const validate = require('../../shared/validateResource');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./product.schema.zod');

// Routes
router.get('/dummy', productController.getDummyProducts);

router
  .route('/')
  .get(productController.getProducts)
  .post(validate(createProductSchema), productController.createProduct);

router
  .route('/:id')
  .get(validate(getProductSchema), productController.getProduct)
  .put(validate(updateProductSchema), productController.updateProduct)
  .delete(validate(getProductSchema), productController.deleteProduct);

module.exports = router;

const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// We should eventually protect these routes with admin middleware
// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(createProduct); // Add protect middleware here later

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct) // Add protect middleware here later
  .delete(deleteProduct); // Add protect middleware here later

module.exports = router;

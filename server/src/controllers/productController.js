const ProductService = require('../services/product.service');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await ProductService.getAllProducts(req.query);
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductService.getProductById(req.params.id);
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Admin)
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductService.createProduct(req.body);
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin)
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin)
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  await ProductService.deleteProduct(req.params.id);
  res.status(200).json({
    success: true,
    data: {}
  });
});

const ProductService = require('../services/product.service');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Admin)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

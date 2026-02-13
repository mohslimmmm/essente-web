const Product = require('./product.model');

/**
 * Create a new product
 * @param {Object} productData
 * @returns {Promise<Object>} Created product
 */
const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

/**
 * Get all products with pagination and filtering
 * @param {Object} query - Query parameters
 * @returns {Promise<Object>} Products and pagination info
 */
const getProducts = async (query) => {
  // Basic implementation - can be expanded with advanced filtering
  const products = await Product.find({ isActive: true });
  return products;
};

/**
 * Get single product by ID
 * @param {String} id
 * @returns {Promise<Object>} Product
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

/**
 * Update product
 * @param {String} id
 * @param {Object} updateData
 * @returns {Promise<Object>} Updated product
 */
const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  return product;
};

/**
 * Delete product (soft delete)
 * @param {String} id
 * @returns {Promise<Object>} Deleted product
 */
const deleteProduct = async (id) => {
  // Soft delete typically preferred
  const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

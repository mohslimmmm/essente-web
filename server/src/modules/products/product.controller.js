const productService = require('./product.service');

/**
 * Create product handler
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products handler
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product handler
 */
const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product handler
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product handler
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get dummy products handler
 */
const getDummyProducts = async (req, res, next) => {
  const dummyProducts = [
    {
      id: '1',
      name: 'Essenté Classic Watch',
      description: 'Minimalist timepiece with genuine leather strap.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1999',
      isNewCollection: true
    },
    {
      id: '2',
      name: 'Leather Weekend Bag',
      description: 'Premium full-grain leather for your getaways.',
      price: 450,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1987',
      isNewCollection: false
    },
    {
      id: '3',
      name: 'Ceramic Vase Set',
      description: 'Handcrafted ceramic vases for modern homes.',
      price: 89,
      image: 'https://images.unsplash.com/photo-1581783342308-f792ca1c76c4?auto=format&fit=crop&q=80&w=2030',
      isNewCollection: true
    },
    {
      id: '4',
      name: 'Wool Blend Throw',
      description: 'Soft and warm throw blanket for chilly evenings.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1580301762395-9c6496707831?auto=format&fit=crop&q=80&w=2000',
      isNewCollection: false
    }
  ];

  res.status(200).json({
    success: true,
    count: dummyProducts.length,
    data: dummyProducts
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getDummyProducts
};

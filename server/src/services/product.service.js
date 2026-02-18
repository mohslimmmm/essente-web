const ProductRepository = require('../repositories/product.repository');
const AppError = require('../utils/AppError');

class ProductService {
  async getAllProducts(query) {
    // Basic filtering implementation
    const filter = { ...query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete filter[el]);
    
    // Advanced filtering (gt, gte, etc.)
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 100;
    const sort = query.sort || '-createdAt';

    return await ProductRepository.findAll(JSON.parse(queryStr), sort, limit, page);
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async createProduct(data) {
    return await ProductRepository.create(data);
  }

  async updateProduct(id, data) {
    const product = await ProductRepository.update(id, data);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await ProductRepository.delete(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}

module.exports = new ProductService();

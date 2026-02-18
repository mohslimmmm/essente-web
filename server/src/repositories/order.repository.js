const BaseRepository = require('./base.repository');
const Order = require('../models/Order');

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByUser(userId) {
    return await this.model.find({ user: userId }).sort('-createdAt').lean();
  }

  async findWithUser(filter = {}) {
    return await this.model.find(filter).populate('user', 'id name email').sort('-createdAt').lean();
  }
}

module.exports = new OrderRepository();

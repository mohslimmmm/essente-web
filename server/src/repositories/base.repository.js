class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findById(id).lean();
  }

  async findOne(filter) {
    return await this.model.findOne(filter).lean();
  }

  async findAll(filter = {}, sort = '-createdAt', limit = 100, page = 1) {
    const skip = (page - 1) * limit;
    return await this.model.find(filter).sort(sort).skip(skip).limit(limit).lean();
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;

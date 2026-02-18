const UserRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');

class AuthService {
  async register(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }
    return await UserRepository.create(userData);
  }

  async login(email, password) {
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await UserRepository.findByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }

    return user;
  }
}

module.exports = new AuthService();

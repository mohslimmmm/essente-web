const OrderService = require('../services/order.service');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.body, req.user._id);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id, req.user._id, req.user.role);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const updatedOrder = await OrderService.updateOrderToPaid(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = async (req, res, next) => {
  try {
    const updatedOrder = await OrderService.updateOrderToDelivered(req.params.id);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getMyOrders(req.user._id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const Order = require('../../models/Order');
const AppError = require('../../shared/AppError');
const catchAsync = require('../../shared/catchAsync');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = catchAsync(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new AppError('No order items', 400);
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Ensure user can only see their own orders unless admin
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
     throw new AppError('Not authorized to view this order', 403);
  }

  res.json(order);
});

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.status = 'delivered'; // Update status text as well if you rely on it

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
const getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

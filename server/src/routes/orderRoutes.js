const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth'); // Check path
const validate = require('../shared/validateResource');
const {
  createOrderSchema,
  updateOrderToPaidSchema,
  updateOrderToDeliveredSchema,
  getOrderSchema,
} = require('../schema/order.schema.zod'); // New location

// Middleware
router.use(protect);

router.route('/').post(validate(createOrderSchema), createOrder).get(authorize('admin'), getOrders); // Add validate
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(validate(getOrderSchema), getOrderById);
router.route('/:id/pay').put(validate(updateOrderToPaidSchema), updateOrderToPaid);
router.route('/:id/deliver').put(authorize('admin'), validate(updateOrderToDeliveredSchema), updateOrderToDelivered);

module.exports = router;

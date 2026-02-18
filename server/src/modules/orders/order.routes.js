const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const validate = require('../../shared/validateResource');
const {
  createOrderSchema,
  updateOrderToPaidSchema,
  updateOrderToDeliveredSchema,
  getOrderSchema,
} = require('./order.schema.zod');

router.use(protect); // Protect all order routes

router
  .route('/')
  .post(validate(createOrderSchema), orderController.createOrder)
  .get(authorize('admin'), orderController.getOrders);

router.route('/myorders').get(orderController.getMyOrders);

router
  .route('/:id')
  .get(validate(getOrderSchema), orderController.getOrderById);

router
  .route('/:id/pay')
  .put(validate(updateOrderToPaidSchema), orderController.updateOrderToPaid);

router
  .route('/:id/deliver')
  .put(
    authorize('admin'),
    validate(updateOrderToDeliveredSchema),
    orderController.updateOrderToDelivered
  );

module.exports = router;

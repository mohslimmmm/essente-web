const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const { protect, authorize, optionalProtect } = require('../../middleware/auth');
const validate = require('../../shared/validateResource');
const {
  createOrderSchema,
  updateOrderToPaidSchema,
  updateOrderToDeliveredSchema,
  getOrderSchema,
} = require('./order.schema.zod');

// router.use(protect); // REMOVED: Global protection blocks guest checkout

router
  .route('/')
  .post(optionalProtect, validate(createOrderSchema), orderController.createOrder) // Allow Guest
  .get(protect, authorize('admin'), orderController.getOrders);

router.route('/myorders').get(protect, orderController.getMyOrders);

router
  .route('/:id')
  .get(protect, validate(getOrderSchema), orderController.getOrderById);

router
  .route('/:id/pay')
  .put(protect, validate(updateOrderToPaidSchema), orderController.updateOrderToPaid);

router
  .route('/:id/deliver')
  .put(
    protect,
    authorize('admin'),
    validate(updateOrderToDeliveredSchema),
    orderController.updateOrderToDelivered
  );

module.exports = router;

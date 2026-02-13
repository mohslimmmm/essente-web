const express = require('express');
const router = express.Router();
const {
  getOverview,
  getSalesData,
  getTopProducts,
  getRecentOrders
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/overview', getOverview);
router.get('/sales', getSalesData);
router.get('/top-products', getTopProducts);
router.get('/recent-orders', getRecentOrders);

module.exports = router;

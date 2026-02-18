// MOCKED PAYMENT CONTROLLER (Stripe Disabled)
const Order = require('../models/Order');
const OrderService = require('../services/order.service');

exports.processPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "OrderId is required" });
    }

    // 1. FETCH ORDER
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.isPaid) {
        return res.status(400).json({ message: "Order is already paid" });
    }

    // 2. MOCK SUCCESSFUL PAYMENT (Start)
    const mockPaymentIntent = {
      id: `mock_pi_${Date.now()}`,
      status: 'succeeded',
      created: Date.now() / 1000,
      receipt_email: 'customer@example.com'
    };
    
    // 3. FINALIZE ORDER IMMEDIATELY (Skip Webhook)
    await OrderService.finalizePaidOrder(orderId, mockPaymentIntent);

    // 4. Return success
    res.status(200).send({
      success: true,
      message: "Payment simulated successfully",
      clientSecret: "mock_secret" 
    });

  } catch (error) {
    console.error("Mock Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

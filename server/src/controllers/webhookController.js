const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OrderService = require('../services/order.service');

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // 1. Verify Signature
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle Event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { orderId } = paymentIntent.metadata;

    if (orderId) {
      try {
        console.log(`💰 Payment succeeded for Order ${orderId}`);
        // 3. Atomic Stock Update & Mark Paid
        await OrderService.finalizePaidOrder(orderId, paymentIntent);
      } catch (err) {
        console.error(`Error finalizing order ${orderId}:`, err);
        // We do NOT return 500 here to avoid Stripe retrying indefinitely if it's a logic error 
        // (but for temporary DB errors, maybe we should).
        // For now, logging error.
      }
    } else {
        console.warn('Payment success but no orderId in metadata');
    }
  }

  // Return 200 to acknowledge receipt
  res.json({ received: true });
};

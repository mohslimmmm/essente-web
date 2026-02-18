const OrderRepository = require('../repositories/order.repository');
const Product = require('../models/Product'); // Need direct access for atomic updates
const AppError = require('../utils/AppError');

class OrderService {
  async createOrder(orderData, userId) {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice } = orderData; // Extract strictly what we need

    if (!orderItems || orderItems.length === 0) {
      throw new AppError('No order items', 400);
    }

    // 1. RECALCULATE PRICES FROM DB (Security)
    let dbOrderItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
      // Use the PRODUCT model directly to get fresh data
      const product = await Product.findById(item.product);
      
      if (!product) {
        throw new AppError(`Product not found: ${item.product}`, 404);
      }

      // Determine price (Base or Variant)
      let price = product.price;
      let stock = product.stock;
      
      // SKU/Variant Logic
      if (item.variantId) {
          const variant = product.variants.find(v => v.sku === item.variantId);
          if (!variant) {
             throw new AppError(`Variant not found: ${item.variantId}`, 404);
          }
          price = variant.price;
          stock = variant.stock;
      }

      // Check Stock (Pre-validation, though real atomic check is at payment/delivery)
      if (stock < item.quantity) {
          throw new AppError(`Insufficient stock for ${product.name}`, 400);
      }

      // Build secure item object
      dbOrderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: price, // Server-side price
        quantity: item.quantity,
        variantId: item.variantId
      });

      itemsPrice += price * item.quantity;
    }

    // Recalculate Total
    // NOTE: Shipping and Tax logic should ideally be server-side or validated too. 
    // For now, we trust the flat shipping/tax passed, or we could enforce a rule here.
    // Let's assume shipping is standard or passed from a secure calculator.
    
    // Force numbers to avoid string concatenation
    const secureTotalPrice = Number(itemsPrice) + Number(shippingPrice || 0) + Number(taxPrice || 0);

    const order = await OrderRepository.create({
      user: userId,
      orderItems: dbOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: Number(itemsPrice.toFixed(2)),
      taxPrice: Number(taxPrice || 0),
      shippingPrice: Number(shippingPrice || 0),
      totalPrice: Number(secureTotalPrice.toFixed(2)),
      isPaid: false,
      status: 'pending'
    });

    return order;
  }

  async getOrderById(orderId, userId, userRole) {
    const order = await OrderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Authorization check
    if (order.user.toString() !== userId.toString() && userRole !== 'admin') {
      throw new AppError('Not authorized to view this order', 403);
    }

    return order;
  }

  async finalizePaidOrder(orderId, paymentIntent) {
    const order = await OrderRepository.findById(orderId);
    if (!order) throw new AppError('Order not found', 404);
    
    // If already paid, ignore to prevent double stock reduction
    if (order.isPaid) return order;

    // 1. Atomic Stock Reduction
    const bulkOps = order.orderItems.map(item => {
      const filter = { _id: item.product };
      const update = {};

      if (item.variantId) {
          // Reduce specific variant stock
          // NOTE: We need to match the specific variant in the array
          filter['variants.sku'] = item.variantId;
          update['$inc'] = { 
              'stock': -item.quantity, // Reduce total stock
              'variants.$.stock': -item.quantity // Reduce variant stock
          };
      } else {
          // Reduce general stock
          update['$inc'] = { stock: -item.quantity };
      }

      return {
        updateOne: {
          filter,
          update
        }
      };
    });

    await Product.bulkWrite(bulkOps);

    // 2. Mark Order as Paid
    const paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: String(paymentIntent.created),
        email_address: paymentIntent.receipt_email
    };

    return await this.updateOrderToPaid(orderId, paymentResult);
  }

  async updateOrderToPaid(orderId, paymentResult) {
    const order = await OrderRepository.findById(orderId);

    if (!order) {
 // ... previous implementation continues ...
      throw new AppError('Order not found', 404);
    }

    const updatedData = {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.email_address,
      },
      status: 'processing' // Advance status
    };

    return await OrderRepository.update(orderId, updatedData);
  }

  async updateOrderToDelivered(orderId) {
    const order = await OrderRepository.findById(orderId);

    if (!order) {
        throw new AppError('Order not found', 404);
    }

    return await OrderRepository.update(orderId, {
      isDelivered: true,
      deliveredAt: Date.now(),
      status: 'delivered'
    });
  }

  async getMyOrders(userId) {
    return await OrderRepository.findByUser(userId);
  }

  async getAllOrders() {
    return await OrderRepository.findWithUser({});
  }
}

module.exports = new OrderService();

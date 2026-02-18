import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiCreditCard, FiMail } from 'react-icons/fi';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Mock order data
  const order = {
    orderNumber: 'ESS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    total: 1548.00,
    items: [
      {
        id: '1',
        name: 'Velvet Sofa',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070'
      },
      {
        id: '3',
        name: 'Ceramic Vase Set',
        quantity: 1,
        price: 89,
        image: 'https://images.unsplash.com/photo-1581783342308-f792ca1c76c4?auto=format&fit=crop&q=80&w=2030'
      }
    ],
    shipping: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3A8',
      country: 'Canada'
    },
    payment: {
      method: 'Visa ending in 4242',
      amount: 1548.00
    }
  };

  return (
    <div className="min-h-screen bg-essente-cream py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
            <FiCheckCircle className="text-green-500" size={48} />
          </div>
          <h1 className="text-4xl font-elegant text-essente-charcoal mb-3">
            Thank You For Your Order!
          </h1>
          <p className="text-gray-600 text-lg">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Order Info */}
          <div className="bg-essente-charcoal text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-gray-400 text-sm mb-1">Order Number</div>
                <div className="font-medium text-[#C5A059]">{order.orderNumber}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Order Date</div>
                <div className="font-medium">{order.date}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Estimated Delivery</div>
                <div className="font-medium">{order.estimatedDelivery}</div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-elegant text-essente-charcoal mb-4 flex items-center gap-2">
              <FiPackage className="text-[#C5A059]" />
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-essente-charcoal">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-essente-charcoal font-medium">
                    CAD ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-elegant text-essente-charcoal mb-4 flex items-center gap-2">
              <FiMapPin className="text-[#C5A059]" />
              Shipping Address
            </h2>
            <div className="text-gray-700">
              <p className="font-medium">{order.shipping.name}</p>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.province} {order.shipping.postalCode}
              </p>
              <p>{order.shipping.country}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-elegant text-essente-charcoal mb-4 flex items-center gap-2">
              <FiCreditCard className="text-[#C5A059]" />
              Payment Method
            </h2>
            <p className="text-gray-700">{order.payment.method}</p>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>CAD ${(order.total - 160).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>CAD $160.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (HST 13%)</span>
                <span>CAD $0.00</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between text-lg font-medium text-essente-charcoal">
                  <span>Total</span>
                  <span>CAD ${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <FiMail className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Confirmation Email Sent</h3>
              <p className="text-blue-700 text-sm">
                We've sent a confirmation email with your order details and tracking information to your email address.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-elegant text-essente-charcoal mb-6 flex items-center gap-2">
            <FiTruck className="text-[#C5A059]" />
            Shipping Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheckCircle className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-essente-charcoal">Order Confirmed</h3>
                <p className="text-gray-600 text-sm">Your order has been received and is being processed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Processing</h3>
                <p className="text-gray-500 text-sm">We're preparing your items for shipment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Shipped</h3>
                <p className="text-gray-500 text-sm">Your order is on its way to you.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Delivered</h3>
                <p className="text-gray-500 text-sm">Enjoy your new ESSENTÉ products!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-essente-charcoal text-white rounded-lg hover:bg-essente-charcoal/90 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-3 border-2 border-essente-charcoal text-essente-charcoal rounded-lg hover:bg-essente-charcoal hover:text-white transition-colors"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

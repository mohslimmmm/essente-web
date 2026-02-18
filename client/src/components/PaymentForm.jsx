import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiLock, FiRefreshCw, FiWifiOff } from 'react-icons/fi';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const PaymentForm = ({ shippingAddress, cart, itemsPrice, taxPrice, shippingPrice, totalPrice, onSuccess, onError, email }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(''); // network, validation, server

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'processing') return;

    // Validate email for guest
    if (!user && !email) {
        setErrorMessage("Please provide an email address.");
        setStatus('error');
        return;
    }

    setStatus('processing');
    setErrorMessage('');
    setErrorType('');

    try {
      // 1. Create Order
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image, 
          price: item.price,
          product: item.id,
          variantId: item.variantId
        })),
        shippingAddress,
        paymentMethod: 'Credit Card (Mock)',
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
        email: email // Add email to payload
      };

      // Add simple timeout/race for network edge case
      const createOrderPromise = api.post('/orders', orderData);
      const { data: order } = await Promise.race([
        createOrderPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Network timout')), 15000))
      ]);
      
      if (!order || !order._id) throw new Error('Order creation failed');

      // 2. Process Payment
      const { data: result } = await api.post('/payment/process', {
        orderId: order._id
      });

      if (result.success) {
         setStatus('success');
         // Small delay to show success state before redirect
         setTimeout(() => {
             onSuccess({ id: 'mock_payment_id', status: 'succeeded' });
         }, 1000);
      } else {
         throw new Error('Payment declined');
      }

    } catch (err) {
      console.error("Payment flow failed", err);
      
      let msg = "Something went wrong. Please try again.";
      let type = "server";

      if (err.message === 'Network timout' || err.code === 'ECONNABORTED' || !navigator.onLine) {
          msg = "Connection lost. Please check your internet and try again.";
          type = "network";
      } else if (err.response) {
          // Server error
          msg = err.response.data.message || "Payment server error.";
          if (err.response.status === 400) type = "validation"; // e.g. Out of stock
      }

      setErrorMessage(msg);
      setErrorType(type);
      setStatus('error');
      onError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
        <div className="flex items-center gap-3 text-gray-700 mb-2">
            <FiLock className="text-[#C5A059]" size={20} />
            <span className="font-medium text-lg">Secure Payment Simulation</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
            Stripe integration is disabled. This is a secure simulation environment. 
            No real charge will be made.
        </p>
      </div>
      
      {status === 'error' && (
        <div className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
            errorType === 'network' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
           {errorType === 'network' ? <FiWifiOff className="mt-0.5" size={16} /> : <FiAlertCircle className="mt-0.5" size={16} />}
           <div>
               <p className="font-medium">{errorType === 'network' ? 'Connection Issue' : 'Payment Failed'}</p>
               <p>{errorMessage}</p>
           </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'processing' || status === 'success'}
        className={`relative w-full py-4 text-white font-medium rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 overflow-hidden
            ${status === 'processing' ? 'bg-gray-400 cursor-not-allowed transform-none' : ''}
            ${status === 'success' ? 'bg-green-600 scale-100' : 'bg-[#C5A059] hover:bg-[#d4b06a] hover:shadow-[#C5A059]/30 hover:-translate-y-0.5'}
            ${status === 'error' ? 'animate-shake' : ''}
        `}
      >
        {status === 'processing' && (
            <>
                <FiRefreshCw className="animate-spin" size={20} />
                <span>Processing Securely...</span>
            </>
        )}

        {status === 'success' && (
            <>
                <FiCheckCircle size={22} className="animate-bounce" />
                <span>Payment Confirmed!</span>
            </>
        )}

        {status === 'idle' || status === 'error' ? (
            <>
                <span>Pay CAD ${totalPrice.toFixed(2)}</span>
                <FiLock size={18} className="opacity-80" />
            </>
        ) : null}
      </button>
      
      <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
      `}</style>
    </form>
  );
};

export default PaymentForm;

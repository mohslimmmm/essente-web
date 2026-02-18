import api from './api';

export const paymentService = {
  // Process payment
  processPayment: async (paymentData) => {
    const response = await api.post('/payment/process', paymentData);
    return response.data;
  },

  // Get payment status (if needed)
  getPaymentStatus: async (orderId) => {
    const response = await api.get(`/payment/status/${orderId}`);
    return response.data;
  }
};

export default paymentService;

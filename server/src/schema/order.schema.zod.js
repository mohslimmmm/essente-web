const { z } = require('zod');

const createOrderSchema = z.object({
  body: z.object({
    orderItems: z.array(
      z.object({
        name: z.string({ required_error: 'Product name is required' }),
        quantity: z.number({ required_error: 'Quantity is required' }),
        image: z.string({ required_error: 'Image URL is required' }),
        price: z.number({ required_error: 'Price is required' }),
        product: z.string({ required_error: 'Product ID is required' }),
      })
    ).nonempty({ message: 'Order items cannot be empty' }),
    shippingAddress: z.object({
      address: z.string({ required_error: 'Address is required' }),
      city: z.string({ required_error: 'City is required' }),
      postalCode: z.string({ required_error: 'Postal Code is required' }),
      country: z.string({ required_error: 'Country is required' }),
    }),
    paymentMethod: z.string({ required_error: 'Payment method is required' }),
    itemsPrice: z.number().optional(),
    taxPrice: z.number().optional(),
    shippingPrice: z.number().optional(),
    totalPrice: z.number({ required_error: 'Total price is required' }),
  }),
});

const updateOrderToPaidSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Order ID is required' }),
  }),
  body: z.object({
    id: z.string().optional(),
    status: z.string().optional(),
    update_time: z.string().optional(),
    email_address: z.string().email().optional(),
  }),
});

const updateOrderToDeliveredSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Order ID is required' }),
  }),
});

const getOrderSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Order ID is required' }),
  }),
});

module.exports = {
  createOrderSchema,
  updateOrderToPaidSchema,
  updateOrderToDeliveredSchema,
  getOrderSchema,
};

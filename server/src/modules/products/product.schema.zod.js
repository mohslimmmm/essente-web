const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    price: z.number().int().positive('Price must be a positive integer (cents)'),
    stock: z.number().int().nonnegative().default(0),
    category: z.string().min(2),
    images: z.array(z.string().url()).optional(),
    isActive: z.boolean().optional()
  })
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ID')
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().int().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().min(2).optional(),
    images: z.array(z.string().url()).optional(),
    isActive: z.boolean().optional()
  })
});

const getProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ID')
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};

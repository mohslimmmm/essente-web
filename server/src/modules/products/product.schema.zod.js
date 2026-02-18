const { z } = require('zod');

const variantSchema = z.object({
  sku: z.string().min(1),
  combination: z.object({
    size: z.string().optional(),
    color: z.string().optional()
  }).optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative()
});

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    price: z.number().positive(),
    compareAtPrice: z.number().positive().optional().nullable(),
    stock: z.number().int().nonnegative().default(0),
    category: z.string().min(2),
    image: z.string().url(),
    images: z.array(z.string().url()).optional(),
    isNewCollection: z.boolean().optional(),
    variants: z.array(variantSchema).optional()
  })
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ID')
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().positive().optional(),
    compareAtPrice: z.number().positive().optional().nullable(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().min(2).optional(),
    image: z.string().url().optional(),
    images: z.array(z.string().url()).optional(),
    isNewCollection: z.boolean().optional(),
    variants: z.array(variantSchema).optional()
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

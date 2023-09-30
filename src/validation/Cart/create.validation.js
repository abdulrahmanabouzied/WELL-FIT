const Joi = require('joi');
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productSchema = Joi.object({
  product: objectIdSchema.required().messages({
    'string.objectId': 'Invalid product ID format.',
    'any.required': 'Product ID is required.'
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number.',
    'any.required': 'Quantity is required.'
  })
});

const cartSchema = Joi.object({
  client: objectIdSchema.required().messages({
    'string.objectId': 'Invalid client ID format.',
    'any.required': 'Client ID is required.'
  }),
  products: Joi.array().items(productSchema).messages({
    'array.base': 'Products must be an array.',
    'array.items': 'Invalid product format.'
  })
});

module.exports = cartSchema;

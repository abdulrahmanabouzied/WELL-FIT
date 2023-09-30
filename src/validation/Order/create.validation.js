const Joi = require('joi');
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productItemSchema = Joi.object({
  product: objectIdSchema.required().messages({
    'string.objectId': 'Invalid product ID format.',
    'any.required': 'Product ID is required.'
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number.',
    'any.required': 'Quantity is required.'
  })
});

const ordersSchema = Joi.object({
  client: objectIdSchema.required().messages({
    'string.objectId': 'Invalid client ID format.',
    'any.required': 'Client ID is required.'
  }),
  products: Joi.array().items(productItemSchema).messages({
    'array.base': 'Products must be an array.',
    'array.items': 'Invalid product item format.'
  }),
  total_price: Joi.number().required().messages({
    'number.base': 'Total price must be a number.',
    'any.required': 'Total price is required.'
  }),
  shipping: objectIdSchema.messages({
    'string.objectId': 'Invalid shipping ID format.'
  }),
  status: Joi.string().valid('pending', 'shipping', 'delivered').messages({
    'any.only': 'Invalid status value.',
  }),
  done_date: Joi.date().messages({
    'date.base': 'Done date must be a valid date.',
  }),
  payment_method: Joi.string().messages({
    'string.base': 'Payment method must be a string.',
  })
});

module.exports = ordersSchema;

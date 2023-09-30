const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'any.required': 'Name is required.'
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number.',
    'any.required': 'Price is required.'
  }),
  description: Joi.string(),
  size: Joi.string().valid('Medium', 'Large', 'Small'),
  calories: Joi.number().messages({
    'number.base': 'Calories must be a number.'
  }),
  review: Joi.number().integer().min(1).max(5).messages({
    'number.base': 'Review must be a number.',
    'number.integer': 'Review must be an integer.',
    'number.min': 'Review must be at least 1.',
    'number.max': 'Review cannot be greater than 5.'
  }),
  paid_counter: Joi.number().messages({
    'number.base': 'Paid counter must be a number.'
  })
});

module.exports = productsSchema;

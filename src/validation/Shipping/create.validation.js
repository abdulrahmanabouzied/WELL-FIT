const Joi = require('joi');
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const shippingsSchema = Joi.object({
  client: objectIdSchema.required().messages({
    'string.objectId': 'Invalid client ID format.',
    'any.required': 'Client ID is required.'
  }),
  mobile_number: Joi.string().pattern(/^\+?\d{10,15}$/).messages({
    'string.pattern.base': 'Mobile number must be a valid phone number.'
  }),
  address: Joi.string().messages({
    'string.empty' : "Address can't be empty"
    
  }),
  street: Joi.string(),
  additional_details: Joi.string(),
  zip_code: Joi.number().messages({
    'number.base': 'Zip code must be a number.'
  })
});

module.exports = shippingsSchema;

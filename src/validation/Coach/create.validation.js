const Joi = require('joi');
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const coachSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a valid string.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password cannot be empty.',
    'any.required': 'Password is required.'
  }),
  username: Joi.string().required().messages({
    'string.base': 'Username must be a string.',
    'string.empty': 'Username cannot be empty.',
    'any.required': 'Username is required.'
  }),
  birthdate: Joi.date().messages({
    'date.base': 'Birthdate must be a valid date.'
  }),
  first_name: Joi.string().required().messages({
    'string.base': 'First name must be a string.',
    'string.empty': 'First name cannot be empty.',
    'any.required': 'First name is required.'
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'Last name must be a string.',
    'string.empty': 'Last name cannot be empty.',
    'any.required': 'Last name is required.'
  }),
  clients: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Clients must be an array of client IDs.',
    'any.only': 'Invalid client ID format.'
  }),
  upComingMeetings: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Upcoming meetings must be an array of meeting IDs.',
    'any.only': 'Invalid meeting ID format.'
  })
});

module.exports = coachSchema;

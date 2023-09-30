const Joi = require('joi');

const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const subscriptionSchema = Joi.object({
  current: objectIdSchema.required().messages({
    'string.pattern.base': 'Invalid current subscription ID format.',
    'any.required': 'Current subscription ID is required.'
  }),
  prev: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Prev subscriptions must be an array.',
    'array.items': 'Invalid prev subscription ID format.'
  })
});

const programSchema = Joi.object({
  current: objectIdSchema.required().messages({
    'string.pattern.base': 'Invalid current program ID format.',
    'any.required': 'Current program ID is required.'
  }),
  prev: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Prev programs must be an array.',
    'array.items': 'Invalid prev program ID format.'
  })
});
const clientSchema = Joi.object({
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
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.only': 'Gender must be either "male" or "female".',
      'any.required': 'Gender is required.'
    }),
    email: Joi.string()
      .trim()
      .min(5)
      .max(100)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'me'] } })
      .messages({
        'string.base': 'Email must be a valid string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.',
        'string.min': 'Email length must be at least 5 characters.',
        'string.max': 'Email length must not exceed 100 characters.',
        'any.required': 'Email is required.'
      }),
    password: Joi.string().required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.'
    }),
    mobile_number: Joi.number().messages({
      'number.base': 'Mobile number must be a number.'
    }),
    coach: objectIdSchema.messages({
      'string.objectId': 'Coach must be a valid object ID.'
    }),
    allow_notifications: Joi.boolean().default(true).messages({
      'boolean.base': 'Allow notifications must be a boolean value.'
    }),
    birthdate: Joi.date().messages({
      'date.base': 'Birthdate must be a valid date.'
    }),
    activity_level: Joi.string()
      .valid('Inactive', 'Lightly Active', 'Very Active', 'Moderately Active')
      .messages({
        'any.only': 'Invalid activity level.',
        'any.required': 'Activity level is required.'
      }),
    fitness_level: Joi.string()
      .valid('Beginner', 'Mid-level', 'Professional')
      .messages({
        'any.only': 'Invalid fitness level.',
        'any.required': 'Fitness level is required.'
      }),
    workout_days: Joi.array()
      .items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'))
      .messages({
        'array.base': 'Workout days must be an array of strings.',
        'any.only': 'Invalid workout day.',
      }),
    upComingMeeting: objectIdSchema.messages({
      'string.objectId': 'Upcoming meeting must be a valid object ID.'
    }),
    matrices: objectIdSchema.messages({
      'string.objectId': 'Matrices must be a valid object ID.'
    })
  });
  
const Joi = require('joi');
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const workoutsRefSchema = Joi.object({
  workout: objectIdSchema.required().messages({
    'string.objectId': 'Invalid workout ID format.',
    'any.required': 'Workout ID is required.'
  }),
  is_done: Joi.boolean().default(false).messages({
    'boolean.base': 'Invalid value for is_done. Must be a boolean.'
  })
});

const nutritionRefSchema = Joi.object({
  meal: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Invalid meals format. Must be an array of meal IDs.'
  }),
  is_done: Joi.boolean().default(false).messages({
    'boolean.base': 'Invalid value for is_done. Must be a boolean.'
  })
});

const dayRefSchema = Joi.object({
  day: Joi.date().required().messages({
    'date.base': 'Invalid date format. Must be a valid date.'
  }),
  workout: Joi.array().items(workoutsRefSchema).messages({
    'array.base': 'Invalid workouts format. Must be an array of workout references.'
  }),
  nutrition: Joi.array().items(nutritionRefSchema).messages({
    'array.base': 'Invalid nutrition format. Must be an array of nutrition references.'
  })
});

const programSchema = Joi.object({
  made_by: objectIdSchema.required().messages({
    'string.objectId': 'Invalid made_by ID format.',
    'any.required': 'made_by ID is required.'
  }),
  length: Joi.number().required().messages({
    'number.base': 'Invalid length. Must be a number.',
    'any.required': 'Length is required.'
  }),
  target: Joi.string()
    .valid('Loss Weight', 'A Healthy Lifestyle', 'Gain Weight', 'Build Muscles')
    .messages({
      'string.base': 'Invalid target. Must be a valid target.',
      'any.only': 'Invalid target value.'
    }),
  days_detail: Joi.array().items(dayRefSchema).messages({
    'array.base': 'Invalid days_detail format. Must be an array of day references.'
  }),
  clients: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Invalid clients format. Must be an array of client IDs.'
  })
});

module.exports = programSchema;

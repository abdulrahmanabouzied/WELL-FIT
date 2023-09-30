const Joi = require('joi')

// WorkoutsRef
const workoutsRefSchema = Joi.object({
  workout: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.hex': 'Workout must be a valid object Id.',
      'string.length': 'Workout must be exactly 24 characters long.',
      'any.required': 'Workout is required.',
    }),
  is_done: Joi.boolean().default(false).messages({
    'boolean.default': 'Invalid boolean format for is_done.',
  }),
});

// NutritionRef 
const nutritionRefSchema = Joi.object({
  meal: Joi.array()
    .items(Joi.string().hex().length(24))
    .messages({
      'string.hex': 'Meal item must be a valid hexadecimal string.',
      'string.length': 'Meal item must be exactly 24 characters long.',
    }),
  is_done: Joi.boolean().default(false).messages({
    'boolean.default': 'Invalid boolean format for is_done.',
  }),
});
// DayRef
const dayRefSchema = Joi.object({
  day: Joi.date().required().messages({
    'date.base': 'Invalid date format for day.',
    'any.required': 'Day is required.',
  }),
  workout: Joi.array()
    .items(workoutsRefSchema)
    .messages({
      'array.base': 'Workout details must be an array.',
      'array.items': 'Invalid workout details format.',
    }),
  nutrition: Joi.array()
    .items(nutritionRefSchema)
    .messages({
      'array.base': 'Nutrition details must be an array.',
      'array.items': 'Invalid nutrition details format.',
    }),
});

// Program
const programSchema = Joi.object({
  template: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.hex': 'Template must be a valid hexadecimal string.',
      'string.length': 'Template must be exactly 24 characters long.',
      'any.required': 'Template is required.',
    }),
  start_date: Joi.date().required().messages({
    'date.base': 'Invalid date format for start_date.',
    'any.required': 'Start date is required.',
  }),
  end_date: Joi.date().messages({
    'date.base': 'Invalid date format for end_date.',
  }),
  length: Joi.number().required().messages({
    'number.base': 'Length must be a valid number.',
    'any.required': 'Length is required.',
  }),
  day_details: Joi.array()
    .items(dayRefSchema)
    .messages({
      'array.base': 'Day details must be an array.',
      'array.items': 'Invalid day details format.',
    }),
});


// ActionProgram 
const actionProgramSchema = Joi.object({
  program: programSchema.required().messages({
    'any.required': 'Program is required.',
    'object.base': 'Invalid program details format.',
  }),
  is_done: Joi.boolean().messages({
    'boolean.base': 'Invalid boolean format for is_done.',
  }),
});

module.exports = {
  actionProgramSchema
}
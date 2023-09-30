const Joi = require('joi');

const mealSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name cannot be empty.',
        'any.required': 'Name is required.'
    }),
    meal_type: Joi.string()
        .valid('breakfast', 'lunch', 'dinner', 'snack')
        .required()
        .messages({
            'string.base': 'Meal type must be a string.',
            'any.only': 'Invalid meal type.',
            'any.required': 'Meal type is required.'
        }),
    protein: Joi.number().messages({
        'number.base': 'Protein must be a number.'
    }),
    carbs: Joi.number().messages({
        'number.base': 'Carbs must be a number.'
    }),
    fiber: Joi.number().messages({
        'number.base': 'Fiber must be a number.'
    }),
    calories: Joi.number().messages({
        'number.base': 'Calories must be a number.'
    }),
    fats: Joi.number().messages({
        'number.base': 'Fats must be a number.'
    }),
    weight: Joi.number().messages({
        'number.base': 'Weight must be a number.'
    }),
    ingredients: Joi.array().items(Joi.string()).messages({
        'array.base': 'Ingredients must be an array of strings.'
    }),
    video: Joi.object().messages({
        'object.base': 'Video must be an object.'
    })
});

module.exports = mealSchema;

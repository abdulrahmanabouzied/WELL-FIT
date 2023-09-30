const Joi = require('joi');

const WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weightSchema = Joi.object({
    target: Joi.number().messages({
        'number.base': 'Invalid target weight. Must be a number.',
        'any.required': 'Target weight is required.'
    }),
    current: Joi.number().messages({
        'number.base': 'Invalid current weight. Must be a number.'
    }),
    reminder: Joi.array()
        .items(Joi.string().valid(...WeekDays).messages({
            'string.base': 'Invalid reminder day. Must be a string.',
            'any.only': 'Invalid day for reminder.',
        })),
    prev: Joi.object({
        weight: Joi.number().required().messages({
            'number.base': 'Invalid previous weight. Must be a number.',
            'any.required': 'Previous weight is required.'
        }),
        date: Joi.date().required().default(() => new Date()).messages({
            'date.format': "Date format must match YYYY-MM-DD",
            'any.required': 'Previous weight date is required.'
        })
    })
});

const matricesSchema = Joi.object({
    weight: weightSchema.required().messages({
        'object.base': 'Weight details are required.'
    }),
    height: Joi.number().messages({
        'number.base': 'Invalid height. Must be a number.'
    }),
    BMI: Joi.number().messages({
        'number.base': 'Invalid BMI. Must be a number.'
    }),
    steps: Joi.number().messages({
        'number.base': 'Invalid steps count. Must be a number.'
    }),
    water: Joi.number().messages({
        'number.base': 'Invalid water intake. Must be a number.'
    }),
    calories: Joi.number().messages({
        'number.base': 'Invalid calories. Must be a number.'
    })
});

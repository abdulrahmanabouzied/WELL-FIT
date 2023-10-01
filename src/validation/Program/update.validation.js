import Joi from "joi";
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const workoutsRefSchema = Joi.object({
  workout: objectIdSchema.messages({
    "string.objectId": "Invalid workout ID format.",
    "any.required": "Workout ID is required.",
  }),
  is_done: Joi.boolean().default(false).messages({
    "boolean.base": "Invalid value for is_done. Must be a boolean.",
  }),
});

const nutritionRefSchema = Joi.object({
  meal: objectIdSchema.messages({
    "string.objectId": "Invalid workout ID format.",
    "any.required": "Workout ID is required.",
  }),
  is_done: Joi.boolean().default(false).messages({
    "boolean.base": "Invalid value for is_done. Must be a boolean.",
  }),
});

const dayRefSchema = Joi.object({
  order: Joi.number().integer().positive(),
  day: Joi.date().messages({
    "date.base": "Invalid date format. Must be a valid date.",
  }),
  workout: Joi.array().items(workoutsRefSchema).messages({
    "array.base":
      "Invalid workouts format. Must be an array of workout references.",
  }),
  nutrition: Joi.array().items(nutritionRefSchema).messages({
    "array.base":
      "Invalid nutrition format. Must be an array of nutrition references.",
  }),
});

const programUpdateSchema = Joi.object({
  name: Joi.string().alphanum().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
    "string.aphanum": "Name must be an alphanum.",
  }),
  made_by: objectIdSchema.messages({
    "string.objectId": "Invalid made_by ID format.",
    "any.required": "made_by ID is required.",
  }),
  length: Joi.number().integer().positive().messages({
    "number.base": "Invalid length. Must be a number.",
    "any.required": "Length is required.",
  }),
  target: Joi.string()
    .valid("Loss Weight", "A Healthy Lifestyle", "Gain Weight", "Build Muscles")
    .messages({
      "string.base": "Invalid target. Must be a valid target.",
      "any.only": "Invalid target value.",
    }),
  days_detail: Joi.array().items(dayRefSchema).messages({
    "array.base":
      "Invalid days_detail format. Must be an array of day references.",
  }),
  clients: Joi.array().items(objectIdSchema).messages({
    "array.base": "Invalid clients format. Must be an array of client IDs.",
  }),
});

export default programUpdateSchema;

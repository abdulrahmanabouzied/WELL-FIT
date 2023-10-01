import Joi from "joi";

const createMeetingSchema = Joi.object({
  coach: Joi.string().required().messages({
    "any.required": "Coach is required.",
    "string.empty": "Coach cannot be empty.",
  }),
  client: Joi.string().required().messages({
    "any.required": "Client is required.",
    "string.empty": "Client cannot be empty.",
  }),
  date: Joi.date().required().messages({
    "any.required": "Date is required.",
    "date.base": "Date must be a valid date.",
  }),
  status: Joi.string()
    .valid("pending", "approved", "cancelled", "done")
    .messages({
      "any.only": "Status must be one of pending, approved, cancelled, done.",
      "any.required": "Status is required.",
    }),
  url: Joi.string().uri().messages({
    "string.uri": "URL must be a valid URL.",
  }),
});

export default createMeetingSchema;

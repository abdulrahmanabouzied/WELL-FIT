import Joi from "joi";

const updateMeetingSchema = Joi.object({
  coach: Joi.string().messages({
    "string.empty": "Coach cannot be empty.",
  }),
  client: Joi.string().messages({
    "string.empty": "Client cannot be empty.",
  }),
  date: Joi.date().messages({
    "date.base": "Date must be a valid date.",
  }),
  status: Joi.string()
    .valid("pending", "approved", "cancelled", "done")
    .messages({
      "any.only": "Status must be one of pending, approved, cancelled, done.",
    }),
  url: Joi.string().uri().messages({
    "string.uri": "URL must be a valid URL.",
  }),
});

export default updateMeetingSchema;

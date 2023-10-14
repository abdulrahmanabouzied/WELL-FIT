import Joi from "joi";

const updateMeetingSchema = Joi.object({
  date: Joi.date().optional().messages({
    "date.base": "Date must be a valid date.",
  }),
  status: Joi.string()
    .optional()
    .valid("pending", "approved", "cancelled", "done")
    .messages({
      "any.only": "Status must be one of pending, approved, cancelled, done.",
    }),
  url: Joi.string().uri().optional().messages({
    "string.uri": "URL must be a valid URL.",
  }),
});

export default updateMeetingSchema;

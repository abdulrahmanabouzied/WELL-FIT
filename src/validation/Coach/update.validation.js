import Joi from "joi";
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern": "Invalid Object ID",
  });

const coachUpdateSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true,
      },
    })
    .messages({
      "string.base": "Email must be a valid string.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one character, one digit, one special character, at least eight.",
    }),
  username: Joi.string().alphanum().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username cannot be empty.",
    "any.required": "Username is required.",
    "string.aphanum": "Username must be an alphanum.",
  }),
  birthdate: Joi.date().messages({
    "date.base": "Birthdate must be a valid date.",
  }),
  first_name: Joi.string().messages({
    "string.base": "First name must be a string.",
    "string.empty": "First name cannot be empty.",
    "any.required": "First name is required.",
  }),
  last_name: Joi.string().messages({
    "string.base": "Last name must be a string.",
    "string.empty": "Last name cannot be empty.",
    "any.required": "Last name is required.",
  }),
  clients: Joi.array().items(objectIdSchema).messages({
    "array.base": "Clients must be an array of client IDs.",
    "any.only": "Invalid client ID format.",
  }),
  upComingMeetings: Joi.array().items(objectIdSchema).messages({
    "array.base": "Upcoming meetings must be an array of meeting IDs.",
    "any.only": "Invalid meeting ID format.",
  }),
  photo: Joi.object(),
  role: Joi.string().valid("coach", "client"),
  socketId: Joi.string().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username cannot be empty.",
  }),
});

export default coachUpdateSchema;

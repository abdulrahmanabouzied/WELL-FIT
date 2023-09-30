export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); // validate all fields

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));
    return res.status(400).json({
      code: 400,
      success: false,
      error: errorDetails,
      name: "ValidationError",
    });
  }

  next();
};

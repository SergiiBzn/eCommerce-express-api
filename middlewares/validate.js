export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const message = err.errors?.[0]?.message || 'Validation error';
    const error = new Error(message);
    error.cause = 400;
    next(error);
  }
};

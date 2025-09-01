export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ msg: err.message || 'Internal Server Error' });
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Email already exists. Please use a different email address.'
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Invalid reference. Please check your input.'
    });
  }

  if (err.code === '23514') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data. Please check your input values.'
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

export default errorHandler;

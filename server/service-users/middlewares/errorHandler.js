const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.message === 'User not found') {
    statusCode = 404;
    message = 'User not found in database';
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;

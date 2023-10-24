const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.message === 'Category not found') {
    statusCode = 400;
    message = 'Category not found in database';
  }

  if (error.message === 'Ingredient not found') {
    statusCode = 404;
    message = 'Ingredient not found in database';
  }

  if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = error.errors[0].message;
  }

  if (error.message === 'Item not found') {
    statusCode = 404;
    message = 'Item not found in database';
  }

  if (error.message === 'Item and ingredients not found') {
    statusCode = 404;
    message = 'Item and ingredients not found in database';
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;

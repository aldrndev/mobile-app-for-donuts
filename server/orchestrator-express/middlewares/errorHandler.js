const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.response && error.response.data) {
    statusCode = error.response.status;
    message = error.response.data.message || 'Error from external service';
  }

  if (error.message === 'Failed add item') {
    statusCode = 400;
    message = 'Failed add item to database';
  }

  if (error.message === 'Failed edit item') {
    statusCode = 400;
    message = 'Failed edit item to database';
  }

  if (error.message === 'Failed delete item') {
    statusCode = 400;
    message = 'Failed delete item from database';
  }

  if (error.message === 'Failed get item') {
    statusCode = 400;
    message = 'Failed get item list from database';
  }

  if (error.message === 'Failed get user') {
    statusCode = 400;
    message = 'Failed get user list from database';
  }

  if (error.message === 'Failed add user') {
    statusCode = 400;
    message = 'Failed add user to database';
  }

  if (error.message === 'Failed delete user') {
    statusCode = 400;
    message = 'Failed delete user from database';
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;

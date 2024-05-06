const customResponseMiddleware = (req, res, next) => {
  res.Response = (statusCode, message = null, data = null) => {
    const responseObject = {
      status: statusCode,
    };
    if (message !== null) {
      responseObject.message = message;
    }
    if (data !== null) {
      responseObject.data = data;
    }
    return res.status(statusCode).json(responseObject);
  };
  next();
};

module.exports = customResponseMiddleware;

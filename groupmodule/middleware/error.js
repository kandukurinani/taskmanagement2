const ErrorResponce = require("./errorResponce");

const errorHandler = (err, req, res, next) => {
  console.log("error name", err.name);
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `user not found with id of ${err.value}`;
    error = new ErrorResponce(message, 404);
  }

  if (err.name === "MongoError") {
    const message = `Dupilcate values entered`;
    error = new ErrorResponce(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponce(message, 400);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || "server error",
  });
};

module.exports = errorHandler;


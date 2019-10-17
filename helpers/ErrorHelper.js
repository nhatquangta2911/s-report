const httpStatus = require('http-status');
const createError = require('http-errors');

const response = (statusCode, responseClient, responseServer) => {
  return {
    statusCode,
    responseClient,
    responseServer
  }
}

const ResponseMessage = {
  BadRequest: (res, message = httpStatus.BAD_REQUEST, error = createError(httpStatus.BAD_REQUEST)) => {
    res.status(httpStatus.BAD_REQUEST).json(response(httpStatus.BAD_REQUEST, createError(message), error));
  },
  Unauthorized: (res, message = httpStatus.UNAUTHORIZED, error = createError(httpStatus.UNAUTHORIZED)) => {
    res.status(httpStatus.UNAUTHORIZED).json(response(httpStatus.UNAUTHORIZED, createError(message), error));
  },
  Forbidden: (res, message = httpStatus.FORBIDDEN, error = createError(httpStatus.FORBIDDEN)) => {
    res.status(httpStatus.FORBIDDEN).json(response(httpStatus.FORBIDDEN, createError(message), error));
  },
  NotFound: (res, message = httpStatus.NOT_FOUND, error = createError(httpStatus.NOT_FOUND)) => {
    res.status(httpStatus.NOT_FOUND).json(response(httpStatus.NOT_FOUND, createError(message), error));
  },
  MethodNotAllowed: (res, message = httpStatus.METHOD_NOT_ALLOWED, error = createError(httpStatus.METHOD_NOT_ALLOWED)) => {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json(response(httpStatus.METHOD_NOT_ALLOWED, createError(message), error));
  },
  InternalServerError: (res, message = httpStatus.INTERNAL_SERVER_ERROR, error = createError(httpStatus.INTERNAL_SERVER_ERROR)) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response(httpStatus.INTERNAL_SERVER_ERROR, createError(message), error));
  },
  Conflict: (res, message = httpStatus.CONFLICT, error = createError(httpStatus.CONFLICT)) => {
    res.status(httpStatus.CONFLICT).json(response(httpStatus.CONFLICT, createError(message), error));
  }
};

module.exports = ResponseMessage;

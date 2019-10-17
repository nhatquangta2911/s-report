const httpStatus = require('http-status');
const createError = require('http-errors');

const ResponseMessage = {
  BadRequest: (res, message = httpStatus.BAD_REQUEST) => {
    res.status(httpStatus.BAD_REQUEST).json(createError(message));
  },
  Unauthorized: (res, message = httpStatus.UNAUTHORIZED) => {
    res.status(httpStatus.UNAUTHORIZED).json(createError(message));
  },
  Forbidden: (res, message = httpStatus.FORBIDDEN) => {
    res.status(httpStatus.FORBIDDEN).json(createError(message));
  },
  NotFound: (res, message = httpStatus.NOT_FOUND) => {
    res.status(httpStatus.NOT_FOUND).json(createError(message));
  },
  MethodNotAllowed: (res, message = httpStatus.METHOD_NOT_ALLOWED) => {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json(createError(message));
  },
  InternalServerError: (res, message = httpStatus.INTERNAL_SERVER_ERROR) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(message));
  },
  Conflict: (res, message = httpStatus.CONFLICT) => {
    res.status(httpStatus.CONFLICT).json(createError(message));
  }
};

module.exports = ResponseMessage;

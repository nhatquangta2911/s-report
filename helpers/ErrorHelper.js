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
  BadRequest: (res, clientMessage = createError(httpStatus.BAD_REQUEST), serverError = createError(httpStatus.BAD_REQUEST)) => {
    res.status(httpStatus.BAD_REQUEST).json(response(httpStatus.BAD_REQUEST, clientMessage, serverError));
  },
  Unauthorized: (res, clientMessage = createError(httpStatus.UNAUTHORIZED), serverError = createError(httpStatus.UNAUTHORIZED)) => {
    res.status(httpStatus.UNAUTHORIZED).json(response(httpStatus.UNAUTHORIZED, clientMessage, serverError));
  },
  Forbidden: (res, clientMessage = createError(httpStatus.FORBIDDEN), serverError = createError(httpStatus.FORBIDDEN)) => {
    res.status(httpStatus.FORBIDDEN).json(response(httpStatus.FORBIDDEN, clientMessage, serverError));
  },
  NotFound: (res, clientMessage = createError(httpStatus.NOT_FOUND), serverError = createError(httpStatus.NOT_FOUND)) => {
    res.status(httpStatus.NOT_FOUND).json(response(httpStatus.NOT_FOUND, clientMessage, serverError));
  },
  MethodNotAllowed: (res, clientMessage = createError(httpStatus.METHOD_NOT_ALLOWED), serverError = createError(httpStatus.METHOD_NOT_ALLOWED)) => {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json(response(httpStatus.METHOD_NOT_ALLOWED, clientMessage, serverError));
  },
  InternalServerError: (res, clientMessage = createError(httpStatus.INTERNAL_SERVER_ERROR), serverError = createError(httpStatus.INTERNAL_SERVER_ERROR)) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response(httpStatus.INTERNAL_SERVER_ERROR, clientMessage, serverError));
  },
  Conflict: (res, clientMessage = createError(httpStatus.CONFLICT), serverError = createError(httpStatus.CONFLICT)) => {
    res.status(httpStatus.CONFLICT).json(response(httpStatus.CONFLICT, clientMessage, serverError));
  }
};

module.exports = ResponseMessage;

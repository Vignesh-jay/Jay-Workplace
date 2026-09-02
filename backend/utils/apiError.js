class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static conflict(message) {
    return new ApiError(409, message);
  }

  static validation(message) {
    return new ApiError(422, message);
  }

  static internal(message = 'Internal server error.') {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;

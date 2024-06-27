/**
 * Custom error class for API errors.
 * Used to handle and differentiate between operational and programming errors.
 * This class facilitates sending error messages and status codes to clients.
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {string} message Error message.
   * @param {number} statusCode HTTP status code for the error.
   * @param {string} errorCode Optional error code for more specific error categorization.
   */
  constructor(message, statusCode, errorCode = "GENERIC_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Differentiates operational errors from programming errors
    this.errorCode = errorCode; // Optional error code for more specific categorization
    this.name = this.constructor.name; // Ensure correct class name is used in error stack traces
    Error.captureStackTrace(this, this.constructor); // Captures stack trace to aid debugging
  }
}

module.exports = ApiError;

/**
 * @class HttpException
 * @classdesc Represents an HTTP exception with a status code, message, and optional error details.
 * @param {number} status - The HTTP status code for the exception (e.g., 400, 404, 500).
 * @param {string} message - The error message describing the exception.
 * @param {any} [error] - Optional additional error details or object to provide context.
 *
 * @extends Error
 */
export class HttpException extends Error {
  /**
   * @property {number} status - The HTTP status code of the exception.
   */
  status;
  /**
   * @property {any} error - Optional additional error details or object.
   */
  error;

  /**
   * Creates an instance of HttpException.
   * @constructor
   * @param {number} status - The HTTP status code for the exception (e.g., 400, 404, 500).
   * @param {string} message - The error message describing the exception.
   * @param {any} [error] - Optional additional error details or object to provide context.
   * @throws {Error} if invalid `status` or `message` provided.
   */
  constructor(status, message, error) {
    super(message);
    /**
     * @type {number}
     * @description http status code.
     */
    this.status = status;
    /**
     * @type {any}
     * @description The error object that gives details about error.
     */
    this.error = error;
  }
}

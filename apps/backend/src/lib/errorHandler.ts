class ErrorHandler extends Error {
  public statusCode: number;

  constructor(message: string | any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly
    Object.setPrototypeOf(this, ErrorHandler.prototype);

    // Capture the stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ErrorHandler;

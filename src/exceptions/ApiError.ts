import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(
    public readonly statusCode: HttpStatus,
    public readonly message: string,
    public readonly isOperational: boolean = true,
  ) {
    super({ statusCode, message, isOperational }, statusCode);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      isOperational: this.isOperational,
      stack: new Error().stack, // Capture current stack trace
    };
  }
}

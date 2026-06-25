export class HttpError extends Error {
  public status: number;
  public details?: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const BadRequest = (msg = 'Bad Request', details?: any) => new HttpError(400, msg, details);
export const NotFound = (msg = 'Not Found', details?: any) => new HttpError(404, msg, details);
export const Unauthorized = (msg = 'Unauthorized', details?: any) => new HttpError(401, msg, details);
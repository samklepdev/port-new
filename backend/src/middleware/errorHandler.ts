import express from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error('Error caught by global handler:', err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  // For validation libraries you might inspect `err` shape here (e.g., joi, zod)
  return res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;

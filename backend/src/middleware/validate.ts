import { Request, Response, NextFunction } from 'express';

type Validator = (value: any) => string | null;
type Schema = Record<string, Validator>;

type ValidationRouteSchema = {
  body?: Schema;
  params?: Schema;
  query?: Schema;
};

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const requiredString = (name: string): Validator => (value) =>
  typeof value === 'string' && value.trim() ? null : `${name} is required`;

export const requiredEmail = (name: string): Validator => (value) =>
  typeof value === 'string' && emailRegex.test(value.trim())
    ? null
    : `${name} must be a valid email`;

export const optionalString = (name: string): Validator => (value) =>
  value === undefined || value === null || typeof value === 'string'
    ? null
    : `${name} must be a string`;

export const optionalEnum = (name: string, values: readonly string[]): Validator => (value) =>
  value === undefined || value === null || values.includes(value)
    ? null
    : `${name} must be one of ${values.join(', ')}`;

export const requiredUuid = (name: string): Validator => (value) =>
  typeof value === 'string' && uuidRegex.test(value)
    ? null
    : `${name} must be a valid UUID`;

const runSchema = (source: any, schema: Schema | undefined, location: string, errors: string[]) => {
  if (!schema) return;
  for (const key of Object.keys(schema)) {
    const error = schema[key](source?.[key]);
    if (error) errors.push(`${location}.${key}: ${error}`);
  }
};

export const validateRequest = (schema: ValidationRouteSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  runSchema(req.body, schema.body, 'body', errors);
  runSchema(req.params, schema.params, 'params', errors);
  runSchema(req.query, schema.query, 'query', errors);

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
};

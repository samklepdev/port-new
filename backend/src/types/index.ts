import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request } from 'express';

export type UserRole = 'admin' | 'editor';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: AuthUser;
}

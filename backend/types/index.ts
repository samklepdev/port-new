import { Request } from 'express';

export type UserRole = 'admin' | 'editor';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
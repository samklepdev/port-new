import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as repo from './auth.repo';
import { User } from '../../models/User';
import { BadRequest, Unauthorized } from '../../errors/HttpError';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET must be defined in environment variables');
  }
  return secret;
};

const signToken = (user: User) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    getJwtSecret(),
    { expiresIn: '7d' }
  );

  /**
   * Registers a new user with the provided email and password.
   * @param email
   * @param password 
   * @returns a JWT token for the newly registered user.
   */
export const register = async (email: string, password: string) => {
  const existing = await repo.findByEmail(email);
  if (existing) throw BadRequest('Email already in use');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await repo.createUser(email, passwordHash);
  return signToken(user);
};

/**
 * Logs in a user with the provided email and password.
 * @param email
 * @param password 
 * @returns a JWT token for the authenticated user.
 */
export const login = async (email: string, password: string) => {
  const user = await repo.findByEmail(email);
  if (!user) throw Unauthorized('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Unauthorized('Invalid credentials');

  return signToken(user);
};
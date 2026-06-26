import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as repo from './auth.repo';
import { User } from '../../models/User';

const signToken = (user: User) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,  
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
  if (existing) throw new Error('Email already in use');

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
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  return signToken(user);
};
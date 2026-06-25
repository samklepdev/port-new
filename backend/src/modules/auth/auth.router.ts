import { Router, Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import * as service from './auth.service';

const router = Router();

/**
 * POST /api/auth/register
 * @returns a JWT token for the newly registered user.
 * @Body parameters:
 * - email: The email of the user (required).
 * - password: The password of the user (required).
 */
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    const token = await service.register(email, password);
    res.status(201).json({ token });
  })
);

/**
 * POST /api/auth/login
 * @returns a JWT token for the authenticated user.
 * @Body parameters:
 * - email: The email of the user (required).
 * - password: The password of the user (required).
 */
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    const token = await service.login(email, password);
    res.json({ token });
  })
);

export default router;
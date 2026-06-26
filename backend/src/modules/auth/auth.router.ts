import { Router, Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { validateRequest, requiredEmail, requiredString } from '../../middleware/validate';
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
  validateRequest({
    body: {
      email: requiredEmail('email'),
      password: requiredString('password'),
    },
  }),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
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
  validateRequest({
    body: {
      email: requiredEmail('email'),
      password: requiredString('password'),
    },
  }),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    res.json({ token });
  })
);

export default router;
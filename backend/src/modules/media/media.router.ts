import { Router, Response } from 'express';
import { authenticate, requireRole } from '../../middleware/auth';
import asyncHandler from '../../middleware/asyncHandler';
import { upload } from '../../middleware/upload';
import { AuthRequest } from '../../types/index';
import * as repo from './media.repo';

const router = Router();

/**
 * GET /api/media
 * Retrieves a list of all media items.
 * Requires authentication.
 * Returns an array of media objects, each including the uploader's id and email.
 */
router.get(
  '/',
  authenticate,
  asyncHandler(async (_req, res) => {
    const media = await repo.findAll();
    res.json(media);
  })
);

/**
 * POST /api/media
  * Uploads a new media file.
  * Requires authentication.
  * Expects a multipart/form-data request with a file field named 'file'.
  * Returns the newly created media object, including the uploader's id and email.
  * If no file is uploaded, returns a 400 error.
 */
router.post(
  '/',
  authenticate,
  upload.single('file'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const media = await repo.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.user!.id,
    });

    res.status(201).json(media);
  })
);

/**
 * DELETE /api/media/:id
 * Deletes a specific media item by its ID.
 * Requires authentication and admin role.
 * Returns a 204 status code if deletion is successful, or a 404 error if the media item is not found.
 */
router.delete(
  '/:id',
  authenticate,
  requireRole('admin'),
  asyncHandler(async (req: AuthRequest<{ id: string }>, res) => {
    const deleted = await repo.remove(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Media not found' });
      return;
    }
    res.status(204).send();
  })
);

export default router;
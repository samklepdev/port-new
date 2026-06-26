import { Router, Response, Request } from 'express';
import { authenticate, requireRole } from '../../middleware/auth';
import asyncHandler from '../../middleware/asyncHandler';
import { AuthRequest } from '../../types/index';
import * as service from './projects.service';

const router = Router();

/**
 * GET /api/projects?status=published
 * @returns a list of all projects, optionally filtered by status.
 * @Query parameters:
 * - status (optional): Filter projects by status (e.g., 'published', 'draft').
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await service.getAll(req.query.status as string | undefined);
    res.json(projects);
  })
);

/**
 * GET /api/projects/:slug
 * @returns a single project by its slug.
 * @Path parameters:
 * - slug: The slug of the project to retrieve.
 */
router.get(
  '/:slug',
  asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
    const project = await service.getBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  })
);

/**
 * POST /api/projects
 * @returns the newly created project.
 * @Body parameters:
 * - title: The title of the project (required).
 * - excerpt: A short excerpt of the project (required).
 * - date: The date of the project (required).
 * - status: The status of the project (optional).
 * - imageId, image2Id, techTabImgId, designTabImgId, tech1Id, tech2Id, tech3Id, tech4Id, tech5Id: Media IDs (optional).
 * @Authentication: Requires a valid JWT token with 'admin' or 'editor' role.
 */
router.post(
  '/',
  authenticate,
  requireRole('admin', 'editor'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const project = await service.create(req.body);
    res.status(201).json(project);
  })
);

/**
 * PUT /api/projects/:id
 * @returns the updated project.
 * @Path parameters:
 * - id: The ID of the project to update.
 * @Body parameters:
 * - title, excerpt, date, status, imageId, image2Id, techTabImgId, designTabImgId, tech1Id, tech2Id, tech3Id, tech4Id, tech5Id: Fields to update (optional).
 * @Authentication: Requires a valid JWT token with 'admin' or 'editor' role.
 */
router.put(
  '/:id',
  authenticate,
  requireRole('admin', 'editor'),
  asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    const project = await service.update(req.params.id, req.body);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  })
);

/**
 * DELETE /api/projects/:id
 * @returns nothing.
 * @Path parameters:
 * - id: The ID of the project to delete.
 * @Authentication: Requires a valid JWT token with 'admin' role.
 */
router.delete(
  '/:id',
  authenticate,
  requireRole('admin'),
  asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    await service.remove(req.params.id);
    res.status(204).send();
  })
);

export default router;
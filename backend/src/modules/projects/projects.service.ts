import * as repo from './projects.repo';
import { Project } from '../../models/Project';
import { MEDIA_FK_FIELDS } from '../../utils/projects';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

const MEDIA_FK_FIELDS = [
  'imageId', 'image2Id', 'techTabImgId', 'designTabImgId',
  'tech1Id', 'tech2Id', 'tech3Id', 'tech4Id', 'tech5Id',
] as const;

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const validateMediaIds = (data: Partial<Project>) => {
  for (const field of MEDIA_FK_FIELDS) {
    const val = data[field];
    if (val !== null && val !== undefined && !UUID_REGEX.test(val)) {
      throw new Error(`${field} must be a valid media UUID`);
    }
  }
};

export const getAll = (status?: string) => repo.findAll(status);

export const getBySlug = (slug: string) => repo.findBySlug(slug);

export const getById = (id: string) => repo.findById(id);

export const create = (data: Partial<Project>) => {
  if (!data.title) throw new Error('Title is required');
  if (!data.excerpt) throw new Error('Excerpt is required');
  if (!data.date) throw new Error('Date is required');

  validateMediaIds(data);

  const slug = slugify(data.title);
  return repo.create({ ...data, slug });
};

export const update = (id: string, data: Partial<Project>) => {
  validateMediaIds(data);
  return repo.update(id, data);
};

export const remove = async (id: string) => {
  const deleted = await repo.remove(id);
  if (!deleted) throw new Error('Project not found');
};
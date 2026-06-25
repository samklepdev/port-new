import { WhereOptions } from 'sequelize';
import Project from '../../models/Project';
import Media from '../../models/Media';

const mediaAttrs = ['id', 'url', 'originalName'];

const include = [
  { model: Media, as: 'image',        attributes: mediaAttrs },
  { model: Media, as: 'image2',       attributes: mediaAttrs },
  { model: Media, as: 'techTabImg',   attributes: mediaAttrs },
  { model: Media, as: 'designTabImg', attributes: mediaAttrs },
  { model: Media, as: 'tech1',        attributes: mediaAttrs },
  { model: Media, as: 'tech2',        attributes: mediaAttrs },
  { model: Media, as: 'tech3',        attributes: mediaAttrs },
  { model: Media, as: 'tech4',        attributes: mediaAttrs },
  { model: Media, as: 'tech5',        attributes: mediaAttrs },
];

export const findAll = (status?: string) =>
  Project.findAll({
    where: status ? ({ status } as WhereOptions) : {},
    include,
    order: [['createdAt', 'DESC']],
  });

export const findBySlug = (slug: string) =>
  Project.findOne({ where: { slug }, include });

export const findById = (id: string) =>
  Project.findByPk(id, { include });

export const create = (data: Partial<Project>) =>
  Project.create(data as any);

export const update = async (id: string, data: Partial<Project>) => {
  const project = await Project.findByPk(id);
  if (!project) return null;
  return project.update(data);
};

export const remove = async (id: string) => {
  const project = await Project.findByPk(id);
  if (!project) return false;
  await project.destroy();
  return true;
};
import Media from '../../models/Media';
import User from '../../models/User';

export const findAll = () =>
  Media.findAll({
    include: [{ model: User, attributes: ['id', 'email'] }],
    order: [['createdAt', 'DESC']],
  });

export const findById = (id: string) => Media.findByPk(id);

export const create = (data: {
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  uploadedBy: string;
}) => Media.create(data as any);

export const remove = async (id: string) => {
  const media = await Media.findByPk(id);
  if (!media) return false;
  await media.destroy();
  return true;
};
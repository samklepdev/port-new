import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Project extends Model {
  declare id: string;
  declare title: string;
  declare slug: string;
  declare summary: string;
  declare body: string;
  declare tags: string[];
  declare status: 'draft' | 'published';
}

Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  summary: DataTypes.TEXT,
  body: DataTypes.TEXT,
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  underscored: true,
});

export default Project;
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

export class Media extends Model {
  declare id: string;
  declare filename: string;
  declare originalName: string;
  declare mimeType: string;
  declare sizeBytes: number;
  declare url: string;
  declare uploadedBy: string;
}

Media.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizeBytes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
}, {
  sequelize,
  modelName: 'Media',
  tableName: 'media',
  underscored: true,
});

// Association
User.hasMany(Media, { foreignKey: 'uploadedBy' });
Media.belongsTo(User, { foreignKey: 'uploadedBy' });

export default Media;
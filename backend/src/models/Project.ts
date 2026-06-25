import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Media from './Media';

export class Project extends Model {
  declare id: string;
  declare title: string;
  declare slug: string;
  declare date: string;
  declare excerpt: string;
  declare body: string | null;
  declare category: string | null;
  declare link: string | null;
  declare status: 'draft' | 'published';

  // Image FKs
  declare imageId: string | null;
  declare image2Id: string | null;
  declare techTabImgId: string | null;
  declare designTabImgId: string | null;

  // Tab content
  declare techTabImgAlt: string | null;
  declare techDescription: string | null;
  declare designTabImgAlt: string | null;
  declare designDescription: string | null;

  // Tech stack
  declare tech1Id: string | null;
  declare tech1Name: string | null;
  declare tech2Id: string | null;
  declare tech2Name: string | null;
  declare tech3Id: string | null;
  declare tech3Name: string | null;
  declare tech4Id: string | null;
  declare tech4Name: string | null;
  declare tech5Id: string | null;
  declare tech5Name: string | null;

  // Theming
  declare baseColor: string | null;
  declare baseTextColor: string | null;
  declare tailwindColor: string | null;

  declare createdAt: Date;
  declare updatedAt: Date;
}

const fk = () => ({
  type: DataTypes.UUID,
  allowNull: true,
  references: { model: Media, key: 'id' },
  onDelete: 'SET NULL' as const,
});

Project.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    excerpt: { type: DataTypes.TEXT, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    link: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft',
      allowNull: false,
    },

    // Image FKs
    imageId: fk(),
    image2Id: fk(),
    techTabImgId: fk(),
    designTabImgId: fk(),

    // Tab content
    techTabImgAlt: { type: DataTypes.STRING, allowNull: true },
    techDescription: { type: DataTypes.TEXT, allowNull: true },
    designTabImgAlt: { type: DataTypes.STRING, allowNull: true },
    designDescription: { type: DataTypes.TEXT, allowNull: true },

    // Tech stack
    tech1Id: fk(),
    tech1Name: { type: DataTypes.STRING, allowNull: true },
    tech2Id: fk(),
    tech2Name: { type: DataTypes.STRING, allowNull: true },
    tech3Id: fk(),
    tech3Name: { type: DataTypes.STRING, allowNull: true },
    tech4Id: fk(),
    tech4Name: { type: DataTypes.STRING, allowNull: true },
    tech5Id: fk(),
    tech5Name: { type: DataTypes.STRING, allowNull: true },

    // Theming
    baseColor: { type: DataTypes.STRING, allowNull: true },
    baseTextColor: { type: DataTypes.STRING, allowNull: true },
    tailwindColor: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    underscored: true,
  }
);

Project.belongsTo(Media, { foreignKey: 'imageId', as: 'image' });
Project.belongsTo(Media, { foreignKey: 'image2Id', as: 'image2' });
Project.belongsTo(Media, { foreignKey: 'techTabImgId', as: 'techTabImg' });
Project.belongsTo(Media, { foreignKey: 'designTabImgId', as: 'designTabImg' });
Project.belongsTo(Media, { foreignKey: 'tech1Id', as: 'tech1' });
Project.belongsTo(Media, { foreignKey: 'tech2Id', as: 'tech2' });
Project.belongsTo(Media, { foreignKey: 'tech3Id', as: 'tech3' });
Project.belongsTo(Media, { foreignKey: 'tech4Id', as: 'tech4' });
Project.belongsTo(Media, { foreignKey: 'tech5Id', as: 'tech5' });

export default Project;
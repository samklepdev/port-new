import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.NODE_ENV === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : {},
});

export default sequelize;
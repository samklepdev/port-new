import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import sequelize from './config/db';
import errorHandler from './middleware/errorHandler';

import './models/User';
import './models/Media';
import './models/Project'
import projectsRouter from './modules/projects/projects.router';
import authRouter from './modules/auth/auth.router';
import mediaRouter from './modules/media/media.router';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));
 
app.use('/api/auth', authRouter);
app.use('/api/media', mediaRouter);
app.use('/api/projects', projectsRouter);
 
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
 
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
};
 
start();
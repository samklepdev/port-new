import 'dotenv/config';
import express from 'express';
import errorHandler from './middleware/errorHandler';
import asyncHandler from './middleware/asyncHandler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 33000;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get(
  '/api/error',
  asyncHandler(async (_req, _res) => {
    throw new Error('Example async error');
  })
);

app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
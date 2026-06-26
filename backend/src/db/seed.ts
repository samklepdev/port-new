import 'dotenv/config';
import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import { createUser, findByEmail } from '../modules/auth/auth.repo';
import '../models/User';
import '../models/Media';
import '../models/Project';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

const exit = async (code: number) => {
  await sequelize.close();
  process.exit(code);
};

const run = async () => {
  if (!email || !password) {
    console.error('Missing ADMIN_EMAIL and ADMIN_PASSWORD environment variables.');
    return exit(1);
  }

  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const existing = await findByEmail(email);
    if (existing) {
      console.log(`Admin user already exists: ${email}`);
      return exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await createUser(email, passwordHash, 'admin');
    console.log(`Admin user created: ${email}`);
    return exit(0);
  } catch (err) {
    console.error('Failed to seed admin user:', err);
    return exit(1);
  }
};

run();

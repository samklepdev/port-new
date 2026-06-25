import User from '../../models/User';

export const findByEmail = async (email: string) =>
  User.findOne({ where: { email } });

export const createUser = async (email: string, passwordHash: string, role = 'editor') =>
  User.create({ email, passwordHash, role } as any);
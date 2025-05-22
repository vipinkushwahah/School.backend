import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../envs';


export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
  return bcrypt.compare(inputPassword, storedPassword);
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '365d' });
}

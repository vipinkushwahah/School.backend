import User, { IUser } from '../models/User';
import { hashPassword } from '../auth/authUtils';

export async function createUser(userData: Partial<IUser>): Promise<IUser> {
  userData.password = await hashPassword(userData.password!);
  const user = new User(userData);
  return user.save();
}

export async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId).populate('role');
}

export async function getAllUsers(query: object): Promise<IUser[]> {
  return User.find(query).populate('role');
}

export async function updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
}

export async function deleteUser(userId: string): Promise<IUser | null> {
  return User.findByIdAndDelete(userId);
}

export async function findUserByEmailAndPhone(email: string, phone: string) {
  return await User.findOne({ email, phone });
}

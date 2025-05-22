import { Request, Response } from 'express';
import { findUserByEmail } from '../services/userService';
import { comparePassword } from '../auth/authUtils';
import jwt from 'jsonwebtoken';

export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

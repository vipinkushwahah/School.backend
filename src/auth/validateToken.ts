import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../envs';


export function validateToken(req: any, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (!decoded) { 
        res.status(401).json({ error: 'Invalid token.' });
        return;
        }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}

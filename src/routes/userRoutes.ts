import express, { Request, Response, NextFunction } from 'express';
import { validateToken } from '../auth';
import {
    createUserController, 
  updateUserController, 
  getUserController, 
  deleteUserController, 
  getAllUsersController 
} from '../controllers';

const router = express.Router();

router.post('/user',  (req: Request, res: Response, next: NextFunction) => createUserController(req, res, next)); // Create user
router.get('/user/:id', validateToken, (req: Request, res: Response, next: NextFunction) => getUserController(req, res, next)); // Get user by ID
router.get('/user/',  (req: Request, res: Response, next: NextFunction) => getAllUsersController(req, res, next)); // Get all users
router.put('/user/:id', validateToken, (req: Request, res: Response, next: NextFunction) => updateUserController(req, res, next)); // Update user by ID
router.delete('/user/:id', validateToken, (req: Request, res: Response, next: NextFunction) => deleteUserController(req, res, next)); // Delete user by ID

export default router;

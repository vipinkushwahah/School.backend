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

router.post('/',  (req: Request, res: Response, next: NextFunction) => createUserController(req, res, next)); // Create user
router.get('/:id', validateToken, (req: Request, res: Response, next: NextFunction) => getUserController(req, res, next)); // Get user by ID
router.get('/', validateToken, (req: Request, res: Response, next: NextFunction) => getAllUsersController(req, res, next)); // Get all users
router.put('/:id', validateToken, (req: Request, res: Response, next: NextFunction) => updateUserController(req, res, next)); // Update user by ID
router.delete('/:id', validateToken, (req: Request, res: Response, next: NextFunction) => deleteUserController(req, res, next)); // Delete user by ID

export default router;

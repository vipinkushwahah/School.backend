import express, { Request, Response, NextFunction } from 'express';
import { validateToken } from '../middleware/authMiddleware';
import {
    createRoleController,
    getRoleController,
    getAllRolesController,
    updateRoleController,
    deleteRoleController,
} from '../controllers/roleController';

const router = express.Router();

router.post('/role', validateToken, (req: Request, res: Response, next: NextFunction) => createRoleController(req, res, next)); // Create role
router.get('/role/:id', validateToken, (req: Request, res: Response, next: NextFunction) => getRoleController(req, res, next)); // Get role by ID
router.get('/role', validateToken, (req: Request, res: Response, next: NextFunction) => getAllRolesController(req, res, next)); // Get all roles
router.put('/role/:id', validateToken, (req: Request, res: Response, next: NextFunction) => updateRoleController(req, res, next)); // Update role by ID
router.delete('/role/:id', validateToken, (req: Request, res: Response, next: NextFunction) => deleteRoleController(req, res, next)); // Delete role by ID

export default router;


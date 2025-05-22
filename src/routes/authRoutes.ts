import express from 'express';
import { loginController } from '../controllers/authController';

const router = express.Router();

router.post('/login', loginController); // Login route

export default router;

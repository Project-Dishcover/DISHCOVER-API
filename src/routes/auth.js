import { Router } from 'express';
import * as authController from '../controllers/authController.js';
// import { verifyToken } from '../middleware/authenticateToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import * as dotenv from 'dotenv';
dotenv.config();
export const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authenticateToken, authController.logout);
authRouter.get('/profile', authenticateToken, authController.getProfile);

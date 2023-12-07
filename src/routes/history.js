import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import * as historyController from '../controllers/historyController.js';
export const historyRouter = Router();

historyRouter.get('/',authenticateToken, historyController.getMyHistory);
historyRouter.delete('/:id', authenticateToken, historyController.deleteHistory);
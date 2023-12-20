import { Router } from 'express';
import * as pantryController from '../controllers/pantryController.js';
// import { verifyToken } from '../middleware/authenticateToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
export const pantryRoute = Router();

pantryRoute.get('/',authenticateToken, pantryController.getPantry);
pantryRoute.post('/:id',authenticateToken, pantryController.postBahan);
pantryRoute.delete('/:id',authenticateToken, pantryController.deleteBahanPantry);
pantryRoute.delete('/',authenticateToken, pantryController.deleteAllPantry);
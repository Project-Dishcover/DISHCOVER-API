import { Router } from 'express';
import * as favouriteController from '../controllers/favouriteController.js';
// import { verifyToken } from '../middleware/authenticateToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
export const myfavourite = Router();

myfavourite.get('/:id',authenticateToken,favouriteController.getMyFavourite);
myfavourite.post('/:id',authenticateToken, favouriteController.postFavourite);
myfavourite.delete('/:id',authenticateToken,favouriteController.deleteFavourite);
import { Router } from 'express';
import * as recipeController from '../controllers/recipeController.js';
// import { verifyToken } from '../middleware/authenticateToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
export const recipeRouter = Router();

recipeRouter.get('/',recipeController.getRecipes);
recipeRouter.get('/:id',recipeController.getDetailsRecipe);
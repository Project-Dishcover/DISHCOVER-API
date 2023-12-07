import { Router } from 'express';
import * as recipeController from '../controllers/recipeController.js';
// import { verifyToken } from '../middleware/authenticateToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { recordRecipeAccess } from '../controllers/historyController.js';
export const recipeRouter = Router();

recipeRouter.get('/',recipeController.getRecipes);
recipeRouter.get('/:id', authenticateToken, recordRecipeAccess, recipeController.getDetailsRecipe);
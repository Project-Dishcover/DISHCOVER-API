import { Router } from 'express';
import * as bahanController from '../controllers/bahanController.js';
export const bahanRouter = Router();

bahanRouter.get('/',bahanController.getBahans);
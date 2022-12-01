import { Router } from 'express';
import { controllerPostProducts,controllerGetProducts } from '../controllers/controllerProducts.js';

export const routerProducts = Router();

routerProducts.post('/', controllerPostProducts);

routerProducts.get('/', controllerGetProducts);
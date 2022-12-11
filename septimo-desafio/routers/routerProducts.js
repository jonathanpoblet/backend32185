import { Router } from 'express';
import { controllerPostProducts,
    controllerGetProducts,
    controllerGetProductById,
    controllerPutProductsById,
    controllerDeleteProductsById,
    controllerDeleteProducts, 
} from '../controllers/controllerProducts.js';

export const routerProducts = Router();

routerProducts.post('/', controllerPostProducts);
routerProducts.get('/', controllerGetProducts);
routerProducts.get('/:id', controllerGetProductById);
routerProducts.put('/:id', controllerPutProductsById);
routerProducts.delete('/:id', controllerDeleteProductsById);
routerProducts.delete('/', controllerDeleteProducts);
const express = require('express');

const { controllerGetProducts,
        controllerPostProducts,
        controllerGetProductById,
        controllerPutProductsById,
        controllerDeleteProductsById } = require('../controllers/controllers.js');

const routerApi = express.Router();

routerApi.get('/', controllerGetProducts);
routerApi.get('/:id', controllerGetProductById);
routerApi.post('/', controllerPostProducts);
routerApi.put('/:id', controllerPutProductsById);
routerApi.delete('/:id', controllerDeleteProductsById);

exports.routerApi = routerApi;
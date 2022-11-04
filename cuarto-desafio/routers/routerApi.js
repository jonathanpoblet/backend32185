const express = require('express');

const { controllerGetProducts,
        controllerPostProducts,
        controllerGetProductById,
        controllerPutProductsById,
        controllerDeleteProductsById } = require('../controllers/controllers.js');

const routerApi = express.Router();

routerApi.get('/api/products', controllerGetProducts);
routerApi.get('/api/products/:id', controllerGetProductById);
routerApi.post('/api/products', controllerPostProducts);
routerApi.put('/api/products/:id', controllerPutProductsById);
routerApi.delete('/api/products/:id', controllerDeleteProductsById);

exports.routerApi = routerApi;
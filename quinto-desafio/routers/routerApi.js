const express = require('express');

const { controllerGetProducts,
        controllerPostProducts } = require('../controllers/controllers.js');

const routerApi = express.Router();

routerApi.get('/', controllerGetProducts);
routerApi.post('/', controllerPostProducts);

exports.routerApi = routerApi;
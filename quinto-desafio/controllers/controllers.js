const { randomUUID } = require('crypto');

const  Container  = require('../class/container.js');
const container =  new Container("./products.txt");

async function controllerGetProducts(req, res) {
    const products =  await container.getAll();
    const productsExist = products.length > 0
    res.render( 'products', { products, productsExist });
} 

async function controllerPostProducts(req, res) {
    const newProduct = req.body;
    newProduct.id  = randomUUID();
    await container.save(newProduct);
    res.status(201);
    res.redirect('/');
} 



exports.controllerGetProducts = controllerGetProducts;
exports.controllerPostProducts = controllerPostProducts;
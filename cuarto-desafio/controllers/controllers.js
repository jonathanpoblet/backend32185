const { randomUUID } = require('crypto');

let products  = require('../products/products.js');
products.map(product => {
    product.id = randomUUID()
})

function controllerGetProducts(req, res) {
    res.json( products );
} 

function controllerPostProducts(req, res) {
    const newProduct = req.body;
    newProduct.id  = randomUUID();
    products.push(newProduct);
    res.status(201);
    res.json(newProduct);
} 

function controllerGetProductById({ params: { id } }, res) {
    const found = products.find(product => product.id === id);
    if (!found) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`})
    }
    else{
        res.json(found)
    }   
}

function controllerPutProductsById({body, params: { id }, res}){
    const foundIndex = products.findIndex(product => product.id === id);
    if(foundIndex === -1) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found` })
    }
    else{
        const product = body;
        products[foundIndex] = product;
        res.json(product);
    }
}

function controllerDeleteProductsById({ params: { id } }, res){
    const foundIndex = products.findIndex(product => product.id === id);
    if(foundIndex === -1) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found` })
    }
    else{
        const deleteProduct = products.splice(foundIndex,1);
        res.json(deleteProduct);
    }
}

exports.controllerGetProducts = controllerGetProducts;
exports.controllerPostProducts = controllerPostProducts;
exports.controllerGetProductById = controllerGetProductById;
exports.controllerPutProductsById = controllerPutProductsById;
exports.controllerDeleteProductsById = controllerDeleteProductsById;
const { randomUUID } = require('crypto');

const  Container  = require('../class/container.js');
const container =  new Container("./products.txt");

async function controllerGetProducts(req, res) {
    let products =  await container.getAll();
    res.json( products );
} 

async function controllerPostProducts(req, res) {
    const newProduct = req.body;
    newProduct.id  = randomUUID();
    await container.save(newProduct)
    res.status(201);
    res.json(newProduct);

} 

async function controllerGetProductById({ params: { id } }, res) {
    const found = await container.getById(id);
    if (!found) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        res.json(found)
    }   
}

async function controllerPutProductsById({body, params: { id }, res}){
    const product = await container.getById(id);
    const newProduct = await container.changeById(id,body,product);
    if(!product) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        res.json(newProduct);
    }

}

async function controllerDeleteProductsById({ params: { id } }, res){
    let deleteProduct = await container.deleteById(id);
    if(!deleteProduct) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`})
    }
    else{
        res.json(deleteProduct);
    }
}

exports.controllerGetProducts = controllerGetProducts;
exports.controllerPostProducts = controllerPostProducts;
exports.controllerGetProductById = controllerGetProductById;
exports.controllerPutProductsById = controllerPutProductsById;
exports.controllerDeleteProductsById = controllerDeleteProductsById;
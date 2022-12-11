import { randomUUID } from 'crypto';
import { containerProducts } from '../container/containerProducts.js';

export async function controllerPostProducts (req,res) {
    const newProduct = req.body;
    newProduct.id = randomUUID();
    await containerProducts.save(newProduct);
    res.json(newProduct);
}

export async function controllerGetProducts (req,res) {
    const allProducts = await containerProducts.getAll();
    res.json(allProducts)
}

export async function controllerGetProductById({ params: { id } }, res) {
    const found = await containerProducts.getById(id);
    if (!found) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        res.json(found)
    }   
}

export async function controllerPutProductsById({body, params: { id }, res}){
    const product = await containerProducts.getById(id);
    if(!product) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        const newProduct = await containerProducts.updateById(id,body);
        res.json(newProduct);
    }

}

export async function controllerDeleteProductsById({ params: { id } }, res){
    const deleteProduct = await containerProducts.deleteById(id);
    if(!deleteProduct) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`})
    }
    else{
        res.json(deleteProduct);
    }
}

export async function controllerDeleteProducts (req, res) {
    const all = await containerProducts.getAll();
    if(all.length == 0){
        res.status(404);
        res.json({ error: `Not products found`})
    } else {
        console.log(all)
        await containerProducts.deleteAll();
        res.json(all);
    }
}
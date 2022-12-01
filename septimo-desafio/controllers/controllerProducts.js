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
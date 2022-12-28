import { Router } from "express";
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export const routerProductsTest = Router();

const products = [];

for(let i=0; i<5 ;i++) {
    products.push({
        id: randomUUID(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.fashion(),
        price: faker.commerce.price(100,300)
    })
}

routerProductsTest.get('/',(req,res) => {
    const productsExist = products.length > 0;
    res.render( 'products', { products, productsExist });
})
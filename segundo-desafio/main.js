const fs = require('fs');

//Declaracion de clase creadora de productos
class ContainerFile {
    #products
    #rute

    constructor(rute) {
        this.#rute = rute;
        this.#products = [];
    }

    async save(product) {
        try {
            this.#products.push(product);
            await fs.promises.writeFile(this.#rute, JSON.stringify(this.#products));  
        } catch (error) {
            throw new Error('No product save: ' + error);
        }
 
    }

    async getById(id) {
        try {
            const readFile = JSON.parse(await fs.promises.readFile(this.#rute, 'utf-8'));
            const productFound = readFile.find((product) => product.id == id);
            return productFound;
        } catch (error) {
            throw new Error('No product found: ' + error);
        }
    } 
    
    async getAll() {
        try {
            this.#products = JSON.parse(await fs.promises.readFile(this.#rute, 'utf-8'));
            return this.#products
        } catch (error) {
            throw new Error('No product found: ' + error);
        }

    }
    
    async deleteById(id) {
        try {
            const productsFilter = this.#products.filter((product) => product.id != id);
            await fs.promises.writeFile(this.#rute, JSON.stringify(productsFilter));
            return productsFilter;
        } catch (error) {
            throw new Error('Can not delete product: ' + error);
        }

    }

    async deleteAll() {
        try {
            this.#products = [];
            await fs.promises.writeFile(this.#rute, JSON.stringify(this.#products));
            return this.#products;
        } catch (error) {
            throw new Error('Can not delete products: ' + error);
        }

    }

}


//Declaracion de productos
const product1 = {
    id:1,
    title:'Product 1',
    price:100,
    thumnail:'url 1'
}
const product2 = {
    id:2,
    title:'Product 2',
    price:400,
    thumnail:'url 2'
}
const product3 = {
    id:3,
    title:'Product 3',
    price:200,
    thumnail:'url 3'
}


//Test de metodos de Clase ContainerFile
async function test() {
    const containerProducts = new ContainerFile('./products.txt');

    await containerProducts.save(product1);
    await containerProducts.save(product2);
    await containerProducts.save(product3);

    console.log(await containerProducts.getAll());
    console.log(await containerProducts.getById(2));
    console.log(await containerProducts.deleteById(3));
    console.log(await containerProducts.deleteAll());
}

test();










class Container {
    #products

    constructor() {
        this.#products = []
    }

    save(product) {
        this.#products.push(product);
    }

    getById(id) {
        const productFound = this.#products.find((product) => product.id == id);
        return productFound
    }
    
    getAll() {
        return this.#products ;
    }

    deleteById(id) {
        const productsFilter = this.#products.filter((product) => product.id != id);
        return productsFilter;
    }

    deleteAll() {
        this.#products = [];
        return this.#products
    }

}

const products = new Container();

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

products.save(product1);
products.save(product2);
products.save(product3);

console.log(products.getById(2));

console.log(products.getAll());

console.log(products.deleteById(2));

console.log(products.getAll());

console.log(products.deleteAll());





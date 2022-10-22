class Container {
    #products

    constructor() {
        this.#products = []
    }

    save(id,title,price,thumbnail) {
        const product = {
            id:id,
            title: title,
            price: price,
            thumbnail: thumbnail
        };

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

products.save(1,'Product 1',100,'url1');
products.save(2,'Product 2',500,'url2');
products.save(3,'Product 3',300,'url2');

console.log(products.getById(2));

console.log(products.getAll());

console.log(products.deleteById(2));

console.log(products.getAll());

console.log(products.deleteAll());





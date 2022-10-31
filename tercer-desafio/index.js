const fs = require("fs");
const express = require("express");

//Declaracion de clase creadora de productos
class ContainerFile {
  #products;
  #rute;

  constructor(rute) {
    this.#rute = rute;
    this.#products = [];
  }

  async save(product) {
    try {
      this.#products.push(product);
      await fs.promises.writeFile(
        this.#rute,
        JSON.stringify(this.#products, null, 2)
      );
    } catch (error) {
      throw new Error("No product save: " + error);
    }
  }

  async getById(id) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#rute, "utf-8")
      );
      const productFound = readFile.find((product) => product.id == id);
      return productFound;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async getRandom() {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#rute, "utf-8")
      );
      const productsLength = readFile.length;
      const randomNumber =  Math.floor((Math.random() * productsLength) + 1);
      console.log(randomNumber);
      const productFound =  readFile.find((product) => product.id == randomNumber);
      console.log(productFound);
      return productFound;
    } catch (error) {
      console.log('error')
    }
  }

  async getAll() {
    try {
      this.#products = JSON.parse(
        await fs.promises.readFile(this.#rute, "utf-8")
      );
      return this.#products;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async deleteById(id) {
    try {
      const productsFilter = this.#products.filter(
        (product) => product.id != id
      );
      await fs.promises.writeFile(
        this.#rute,
        JSON.stringify(productsFilter, null, 2)
      );
      return productsFilter;
    } catch (error) {
      throw new Error("Can not delete product: " + error);
    }
  }

  async deleteAll() {
    try {
      this.#products = [];
      await fs.promises.writeFile(
        this.#rute,
        JSON.stringify(this.#products, null, 2)
      );
      return this.#products;
    } catch (error) {
      throw new Error("Can not delete products: " + error);
    }
  }
}

//Declaracion de productos
const product1 = {
  id: 1,
  title: "Product 1",
  price: 100,
  thumnail: "url 1",
};
const product2 = {
  id: 2,
  title: "Product 2",
  price: 400,
  thumnail: "url 2",
};
const product3 = {
  id: 3,
  title: "Product 3",
  price: 200,
  thumnail: "url 3",
};

const containerProducts = new ContainerFile("./products.txt");


//Funcion para guardar productos 
async function saveProducts() {
  await containerProducts.save(product1);
  await containerProducts.save(product2);
  await containerProducts.save(product3);
}

const servidor = express();

servidor.get("/products", async (peticion, respuesta) => {
  respuesta.send(await containerProducts.getAll());
});
servidor.get("/productRandom", async (peticion, respuesta) => {
    respuesta.send(await containerProducts.getRandom());
});

function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectador = servidor.listen(puerto, () => {
      resolve(servidorConectador);
    });
    servidorConectador.on("error", (error) => reject(error));
  });
}

async function main() {
  try {
    const serv = await conectar(8080);
    console.log(`conectado al puerto ${serv.address().port}`);
  } catch (error) {
    console.log(`algo fallo: ` + error);
  }
}




saveProducts();
main();

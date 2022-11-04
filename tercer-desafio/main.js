const fs = require("fs");
const express = require("express");
const { get } = require("http");

//Declaracion de clase creadora de productos
class ContainerFile {
  #file;

  constructor(file) {
    this.#file = file;
  }

  async getAll() {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#file, "utf-8")
      );
      return readFile;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async save(product) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#file, "utf-8")
    );
    fs.writeFileSync(this.#file, JSON.stringify([...readFile, product],null,2));  
    } catch (error) {
      throw new Error("No product save: " + error);
    }
  }

  async deleteAll() {
    try {
        const readFile = JSON.parse(
            await fs.promises.readFile(this.#file, "utf-8")
        );
        readFile.slice(0,readFile.length)
        await fs.promises.writeFile(
            this.#file,
            JSON.stringify(readFile, null, 2)
          );
    } catch (error) {
        
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

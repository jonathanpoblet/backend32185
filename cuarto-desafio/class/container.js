const fs = require("fs");

class Container {
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
        throw new Error("No product save: " + error);
    }
  }

  async getById(id) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#file, "utf-8")
      );
      const productFound = readFile.find((product) => product.id == id);
      return productFound;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll()
      const found = products.find(
        (product) => product.id === id
        )
      const productsFilter = products.filter(
        (product) => product.id != id
      );
      await fs.promises.writeFile(
        this.#file,
        JSON.stringify(productsFilter, null, 2)
      );
      return found;
    } catch (error) {
      throw new Error("Can not delete product: " + error);
    }
  }
}

module.exports = Container



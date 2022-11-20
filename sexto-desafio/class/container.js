const fs = require("fs");

class ContainerProducts {
  #containerProducts;

  constructor(containerProducts) {
    this.#containerProducts = containerProducts;
  }

  async getAllProducts() {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerProducts, "utf-8")
      );
      return readFile;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async save(product) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerProducts, "utf-8")
    );
    fs.writeFileSync(this.#containerProducts, JSON.stringify([...readFile, product],null,2));  
    } catch (error) {
      throw new Error("No product save: " + error);
    }
  }
}

module.exports = ContainerProducts



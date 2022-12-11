import fs from 'fs';

export class ContainerFile {
  #containerFile;

  constructor(containerFile) {
    this.#containerFile = containerFile;
  }

  async getAll() {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerFile, "utf-8")
      );
      return readFile;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async save(item) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerFile, "utf-8")
    );
    await fs.promises.writeFile(this.#containerFile, JSON.stringify([...readFile, item],null,2));  
    } catch (error) {
      throw new Error("No product save: " + error);
    }
  }

  async deleteAll() {
    try {
        const readFile = JSON.parse(
            await fs.promises.readFile(this.#containerFile, "utf-8")
        );
        readFile.slice(0,readFile.length)
        await fs.promises.writeFile(
            this.#containerFile,
            JSON.stringify(readFile, null, 2)
          );
    } catch (error) {
        throw new Error("No product save: " + error);
    }
  }

  async getById(id) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerFile, "utf-8")
      );
      const Found = readFile.find((product) => product.id == id);
      return Found;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async changeById(id,body,item) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerFile, "utf-8")
      );
      const foundIndex = await readFile.findIndex(product => product.id === id);
      readFile[foundIndex] = {...item,...body};
      readFile[foundIndex].id = id;
      const Update = readFile[foundIndex]
      await fs.promises.writeFile(this.#containerFile, JSON.stringify(readFile,null,2));  
      return Update;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async deleteById(id) {
    try {
      const all = await this.getAll()
      const found = all.find(
        (item) => item.id === id
        )
      const allFilter = all.filter(
        (item) => item.id != id
      );
      await fs.promises.writeFile(
        this.#containerFile,
        JSON.stringify(allFilter, null, 2)
      );
      return found;
    } catch (error) {
      throw new Error("Can not delete product: " + error);
    }
  }
}



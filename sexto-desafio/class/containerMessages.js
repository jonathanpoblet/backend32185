const fs = require("fs");

class ContainerMessages {
  #containerMessages;

  constructor(containerMessages) {
    this.#containerMessages = containerMessages
  }

  async getAllMessages() {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerMessages, "utf-8")
      );
      return readFile;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async saveMessages(message){
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#containerMessages, "utf-8")
    );
    fs.writeFileSync(this.#containerMessages, JSON.stringify([...readFile, message],null,2));  
    } catch (error) {
      throw new Error("No message save: " + error);
    }
  }
}

module.exports = ContainerMessages



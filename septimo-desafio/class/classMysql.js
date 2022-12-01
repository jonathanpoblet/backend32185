export class ClassMysql {
  constructor(clientMysql, table) {
    this.client = clientMysql;
    this.table = table;
  }

  async getAll() {
    try {
      const all = await this.client(this.table).select();
      return all;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async save(item) {
    try {
      await this.client(this.table).insert(item);
    } catch (error) {
      throw new Error("No product save: " + error);
    }
  }
}



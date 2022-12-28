export class ClassMysql {
  constructor(clientMysql, table) {
    this.client = clientMysql;
    this.table = table;
  }

  async save(item) {
    try {
      await this.client(this.table).insert(item);
    } catch (error) {
      throw new Error(`No ${item} save: ${error}`);
    }
  }

  async getAll() {
    try {
      const all = await this.client(this.table).select();
      return all;
    } catch (error) {
      throw new Error(`Can not get all: ${error}`);
    }
  }

  async getById(id) {
    try {
      const productFound = await this.client(this.table).select("id","name","description","image","price").where({"id":id});
      return productFound[0];
    } catch (error) {
        throw new Error(`Can not get item with id: ${id}`);      
    }
  }

  
  async updateById(id,change) {
    try {
      await this.client(this.table).where({"id" : id}).update(change);
      const itemChange = this.getById(id);
      return itemChange
    } catch (error) {
      throw new Error(`Can not update item with id: ${id}`);
    }
  }
  
  async deleteById(id) {
    try {
      const productFound = await this.client(this.table).select("id","name","description","image","price").where({"id":id});
      await this.client(this.table).del().where({"id" : id});
      return(productFound[0])
    } catch (error) {
      throw new Error(`Can not delete item with id: ${id}`);      
    }
  }
   
  async deleteAll() {
    try {
      await this.client(this.table).del()
    } catch (error) {
        throw new Error(`Can not delete all: ${error}`);
    }
  }
}



import { clientSql as knex } from '../clientSql.js'

export function createTableProducts() {
    knex.schema.hasTable('products')
        .then(exists => {
            if (!exists) {
                knex.schema.createTable('products', table => {
                    table.string('id'),
                    table.string('name'),
                    table.string('description'),
                    table.string('image'),
                    table.integer('price')
                })
                    .then(() => {
                        console.log('Products table created!');
                    })
            } else {
                console.log('Products table already exist');
            }
        })
        .finally(() => {
            knex.destroy()
        })
}

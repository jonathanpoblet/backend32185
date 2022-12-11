import { clientSql as knex } from '../clientSql.js'

export function createTableMessages() {
    knex.schema.hasTable('messages')
        .then(exists => {
            if (!exists) {
                knex.schema.createTable('messages', table => {
                    table.string('id'),
                    table.string('email'),
                    table.string('message'),
                    table.string('date')
                })
                    .then(() => {
                        console.log('Messages table created!');
                    })
            } else {
                console.log('Messages table already exist');
            }
        })
        .finally(() => {
            knex.destroy()
        })
}
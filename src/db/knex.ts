import knex from 'knex';

const connectKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite3',
    },
    useNullAsDefault: true
})

export { connectKnex }
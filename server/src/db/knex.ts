import knex from 'knex';
import config from './knexfile'

const connectKnex = knex(config)

export { connectKnex }
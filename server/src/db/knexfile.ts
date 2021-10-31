import { Knex } from "knex";

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: '/var/lib/db/db.sqlite3'
  },
  useNullAsDefault : true,
  migrations: {
    directory: './migrations'
  }
}

export default config

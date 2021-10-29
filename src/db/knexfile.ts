import { Knex } from "knex";

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: __dirname+'/db.sqlite3'
  },
  useNullAsDefault : true,
  migrations: {
    directory: './migrations'
  }
}

export default config

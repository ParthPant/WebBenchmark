import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const createQuery = `CREATE TABLE "APPS" (
        "ID"	INTEGER,
        "UUID"  TEXT UNIQUE NOT NULL,
        "CODE"	TEXT,
        "EXIT_STATUS"	INTEGER,
        "OUTPUT"	TEXT,
        "LOG" TEXT,
        PRIMARY KEY("ID")
    )`
    return knex.raw(createQuery) 
}


export async function down(knex: Knex): Promise<void> {
    let dropQuery = `DROP TABLE APPS`
    return knex.raw(dropQuery) 
}

